
const CACHE_NAME = 'kirbyjs-portfolio-v1';
const urlsToCache = [
    '/index.html'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});
