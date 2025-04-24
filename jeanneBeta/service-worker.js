//Jeanne Service Worker.

self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: './appLogoV2.png',
    });
});


const CACHE_NAME = 'jeanne-cache-v15';
const STATIC_ASSETS = [
    '/jeanneBeta/',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Allow network requests for non-evoxs.xyz and exclude data.evoxs.xyz
    if (!url.hostname.endsWith('evoxs.xyz') || url.hostname.startsWith('data.') || url.hostname.startsWith('arc.')) {
        return;
    }
    
    // Cache-first strategy for static assets
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                return cachedResponse || fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});