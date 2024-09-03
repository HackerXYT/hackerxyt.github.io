//self.addEventListener('fetch', function(event) {
//    if (event.request.destination === 'image') {
//        event.respondWith(
//            caches.match(event.request).then(function(cachedResponse) {
//                if (cachedResponse) {
//                    return cachedResponse; // Cache hit - return the cached response
//                }
//
//                // Fetch from the network
//                return fetch(event.request).then(function(networkResponse) {
//                    // Check if the response is valid and cloneable before using
//                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
//                        return networkResponse;
//                    }
//
//                    // Clone the response for caching
//                    const responseClone = networkResponse.clone();
//
//                    caches.open('images-cache').then(function(cache) {
//                        cache.put(event.request, responseClone);
//                    });
//
//                    return networkResponse;
//                });
//            }).catch(function() {
//                // If both cache and network fail, try to serve a fallback image
//                return caches.match('/hologram/nexusEpsilon.png');
//            })
//        );
//    }
//});


const STATIC_CACHE_NAME = 'static-cache-v5';
const APP_CACHE_NAME = 'app-cache-v5';
const CACHE_STATIC = [
  "/hologram/",
  "/hologram/index.html",
  "/hologram/style.css",
  "/hologram/apple.png",
  "/hologram/dc.png",
  "/hologram/fav.svg",
  "/hologram/mails.png",
  "/hologram/nexusEpsilon.png",
  "/hologram/nexusEpsilonold.png",
  "/hologram/nexusIMG.png",
  "/hologram/nexusSLINE.png",
  "/hologram/nexusTasco.png",
  "/hologram/notyetloaded.gif",
  "/hologram/script.js",
  "/hologram/SFUIText-Medium.ttf",
  "/hologram/searching_users.gif",
  "/hologram/sline.png",
  "/hologram/hologramW.png",
  "/hologram/arrow-down.svg",
  "/hologram/splash/apple-splash-640-1136.png",
  "/evox-epsilon-beta/ohNoEvoxError.html" // Ensure this is cached
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
self.addEventListener("activate", e => {
  e.waitUntil(
      caches.keys().then(keys => {
          return Promise.all(
              keys.filter(key => key !== STATIC_CACHE_NAME && key !== APP_CACHE_NAME)
                  .map(key => {
                      console.log("Deleting old cache:", key);
                      return caches.delete(key);
                  })
          );
      }).then(() => self.clients.claim())
  );
});

// Fetch event: Serve cached content when offline and update cache with network responses
self.addEventListener("fetch", e => {
  e.respondWith(
      caches.match(e.request).then(response => {
          if (response) {
              return response;
          }

          return fetch(e.request).then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                  const responseClone = networkResponse.clone();
                  caches.open(STATIC_CACHE_NAME).then(cache => {
                      cache.put(e.request, responseClone).catch(err => {
                          console.error("Failed to cache the request:", e.request.url, err);
                      });
                  });
              }
              return networkResponse;
          }).catch(() => {
              // Fallback URL for offline scenarios
              return caches.match("/evox-epsilon-beta/ohNoEvoxError.html");
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