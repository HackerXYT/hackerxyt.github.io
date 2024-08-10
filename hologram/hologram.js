self.addEventListener('fetch', function(event) {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    return caches.open('images-cache').then(function(cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }
});


const STATIC_CACHE_NAME = 'static-cache-v1';
const APP_CACHE_NAME = 'app-cache-v1';
const CACHE_STATIC = [
  '/hologram/',
  '/hologram/index.html',
  '/hologram/style.css',
  '/hologram/apple.png',
  '/hologram/dc.png',
  '/hologram/fav.svg',
  '/hologram/mails.png',
  '/hologram/nexusEpsilon.png',
  '/hologram/nexusEpsilonold.png',
  '/hologram/nexusIMG.png',
  '/hologram/nexusSLINE.png',
  '/hologram/nexusTasco.png',
  '/hologram/notyetloaded.gif',
  '/hologram/script.js',
  '/hologram/SFUIText-Medium.ttf',
  '/hologram/searching_users.gif',
  '/hologram/sline.png'
];
const CACHE_APP = [
  '/hologram/script.js'
];

// Install event: Cache static and app resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME),
      caches.open(APP_CACHE_NAME)
    ]).then(([staticCache, appCache]) => {
      console.log('Caches opened and resources added.');
      return Promise.all([
        staticCache.addAll(CACHE_STATIC),
        appCache.addAll(CACHE_APP)
      ]);
    }).then(() => {
      return self.skipWaiting(); // Activate the new service worker immediately
    })
  );
});

// Activate event: Clean up old caches and claim clients
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Take control of all clients immediately
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== APP_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Fetch event: Serve cached content when offline and update cache with network responses
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Cache hit - return the cached response
      }

      // Fetch from the network and update the cache
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(STATIC_CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match('/hologram/nexusEpsilon.png'); // Serve offline page if network fails
      });
    })
  );
});

// Handle messages from the client to manually update the cache
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'UPDATE_CACHE') {
    event.waitUntil(
      updateCache()
    );
  }
});

// Function to manually update the cache
async function updateCache() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(cacheName => cacheName !== STATIC_CACHE_NAME && cacheName !== APP_CACHE_NAME);

  // Open current caches
  const [staticCache, appCache] = await Promise.all([
    caches.open(STATIC_CACHE_NAME),
    caches.open(APP_CACHE_NAME)
  ]);

  // Add updated resources to the current caches
  await Promise.all([
    staticCache.addAll(CACHE_STATIC),
    appCache.addAll(CACHE_APP)
  ]);

  // Delete old caches
  await Promise.all(oldCaches.map(cacheName => caches.delete(cacheName)));

  console.log('Cache updated and old caches cleared.');
}