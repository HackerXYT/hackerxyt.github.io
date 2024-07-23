self.addEventListener('push', function(event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'evox-logo-apple.png' // Optional: Add the path to an icon
    });
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://evoxs.xyz/evox-epsilon/')
    );
});

const CACHE_NAME = 'oasa-cache-v1';
const urlsToCache = [
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
  '/oasaMobile/c027bec07c2dc08b9df60921dfd539bd.jpg',
  '/oasaMobile/cbimage.png',
  '/oasaMobile/error-handling-svgrepo-com.svg',
  '/oasaMobile/SFUIText-Medium.ttf',
  '/oasaMobile/snap.png',
  '/oasaMobile/warning-alert-svgrepo-com.svg'
];

// Install event: Cache the resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Cache hit - return the cached response
        }
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }).catch(() => {
        return caches.match('/offline.html');
      })
  );
});