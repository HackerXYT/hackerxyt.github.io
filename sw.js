self.addEventListener('push', function (event) {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'evox-logo-apple.png' // Optional: Add the path to an icon
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://evoxs.xyz/evox-epsilon/')
  );
});

const CACHE_NAME = 'oasa-cache-v3';
const CACHE_VERSION = 'v1'; // Change this version string when updating the cache

const urlsToCache = [

];

const STATIC_CACHE_NAME = 'static-cache-v3';
const APP_CACHE_NAME = 'app-cache-v3';
const CACHE_STATIC = [
  '/oasaMobile/',
  '/oasaMobile/index.html',
  '/oasaMobile/style.css',
  '/oasaMobile/default.css',
  '/oasaMobile/apple.png',
  '/oasaMobile/setup.png',
  '/oasaMobile/doodle.png',
  '/oasaMobile/recent.png',
  '/oasaMobile/personal.png',
  '/oasaMobile/reloading-pfp.gif',
  '/oasaMobile/evox-logo-dark.png',
  '/oasaMobile/jquery-3.7.1.js',
  '/oasaMobile/script.js',
  '/oasaMobile/c027bec07c2dc08b9df60921dfd539bd.jpg',
  '/oasaMobile/cbimage.png',
  '/oasaMobile/error-handling-svgrepo-com.svg',
  '/oasaMobile/SFUIText-Medium.ttf',
  '/oasaMobile/snap.png',
  '/oasaMobile/warning-alert-svgrepo-com.svg',
  '/oasaMobile/offline.html',
  '/oasaMobile/iphone-se-640x1136.png',
  '/oasaMobile/iphone-6-750x1334.png',
  '/oasaMobile/iphone-6-plus-1242x2208.png',
  '/oasaMobile/iphone-x-1125x2436.png',
  '/oasaMobile/iphone-xr-1242x2688.png',
  '/oasaMobile/ipad-768x1024.png',
  '/oasaMobile/ipad-retina-1536x2048.png',
  '/oasaMobile/manifest.json',
  '/oasaMobile/arrow-down.svg'
];
const CACHE_APP = [
  '/oasaMobile/script.js'
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
        return caches.match('/oasaMobile/offline.html'); // Serve offline page if network fails
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