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

const CACHE_NAME = 'oasa-cache-v1';
const CACHE_VERSION = 'v1'; // Change this version string when updating the cache

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

self.addEventListener('install', event => {
    self.skipWaiting(); // Activate the new service worker immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache and adding resources');
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate event: Clean up old caches and immediately claim clients
self.addEventListener('activate', event => {
    const currentCaches = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!currentCaches.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim(); // Take control of all clients immediately
        })
    );
});

// Fetch event: Serve cached content when offline, update cache with new responses
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                // Return cached response
                return response;
            }

            // Fetch from network and cache it
            return fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If network request fails, serve offline fallback
                return caches.match('/offline.html');
            });
        })
    );
});