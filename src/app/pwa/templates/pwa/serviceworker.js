// Change v1 to v{up}, etc. when you update any of the local resources, which will in turn trigger the install event again.
const CACHE_PWA = 'pwa-offline-v1';
const DYNAMIC_CACHE_PWA = 'pwa-offline-dynamic';
//importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
//importScripts('./web-push.js')

const filesToCache = [
    '/offline/',
    '/static/lib/pwa/css/django-pwa-app.css',
    '/static/lib/pwa/js/dj-pwa-support.js',
    '/static/img/icons/loading.gif',
    '/static/lib/pwa/images/launchers/launcher-72x72.png',
    '/static/lib/pwa/images/launchers/launcher-96x96.png',
    '/static/lib/pwa/images/launchers/launcher-144x144.png',
    '/static/lib/pwa/images/launchers/launcher-192x192.png',
    '/static/lib/pwa/images/launchers/launcher-512x512.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-640x1136.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-750x1334.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-828x1792.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1125x2436.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1170x2532.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1179x2556.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1242x2208.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1242x2688.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1536x2048.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1668x2224.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-1668x2388.png',
    '/static/lib/pwa/images/splash/portrait/splash-portrait-2048x2732.png',
    '/static/lib/pwa/images/splash/landscape/splash-landscape-2532x1170.png',
    '/static/lib/pwa/images/splash/landscape/splash-landscape-2556x1179.png',
    '/static/lib/pwa/images/splash/landscape/splash-landscape-1334x750.png',
    '/static/lib/pwa/images/splash/landscape/splash-landscape-2436x1125.png',
    '/static/lib/pwa/images/splash/landscape/splash-landscape-2388x1668.png',
    '/static/lib/pwa/images/splash/landscape/splash-landscape-2732x2048.png',
    '/static/lib/pwa/images/splash/landscape/splash-landscape-2048x1536.png'
];

/*
'/sign-in/?fancybox=true',
'/sign-up/?fancybox=true',
'/pass-reset/?fancybox=true',
'/review-add/?movieid={/d/}&type=review&fancybox=true',
 */
const cacheExclude_endsWith = [
    'fancybox=true',
];

const cacheExclude_startsWith = [
    '/search-suggestion/',
    '/movies/search/',
    '/__debug__/',
    '/admin/'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_PWA)
            .then((cache) => cache.addAll(filesToCache))
            .then(() => self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [CACHE_PWA, DYNAMIC_CACHE_PWA];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("pwa-offline")))
                    .filter(cacheName => (!currentCaches.includes(cacheName)))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

function isUrlCacheExclude(pathname, url) {
  return cacheExclude_endsWith.some(path => url.endsWith(path)) || cacheExclude_startsWith.some(path => pathname.startsWith(path));
}

// При запросе на сервер мы используем данные из кэша и только после идем на сервер.
// Serve from Cache
self.addEventListener('fetch', (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        const url = new URL(event.request.url);
        if (event.request.method === 'GET' && !isUrlCacheExclude(url.pathname, event.request.url) ) {
            // Как и в предыдущем примере, сначала `respondWith()` потом `waitUntil()`
            event.respondWith(fromCacheOrNetworkOrOffline(event.request));
            event.waitUntil(update(event.request));
        }
    }
});

self.addEventListener('message', (msg) => {
    console.log(msg.data)
    if (msg.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

function fromCacheOrNetworkOrOffline(request) {
    return caches.open(DYNAMIC_CACHE_PWA).then((cache) =>
        caches.match(request).then(((matching) =>
            matching || fetch(request).then((response) => {
            if (response.status >= 400) {
                throw Error('An error has occurred');
            }
            return cache.put(request, response.clone()).then(() => response)}))
        ).catch(() => {
            return caches.match('/offline/');
        }));
}

function fromCache(request) {
    return caches.open(CACHE_PWA).then((cache) =>
        cache.match(request).then((matching) =>
            matching ||  caches.match('/waiting/')
        ));
}

function update(request) {
    return caches.open(DYNAMIC_CACHE_PWA).then((cache) =>
        cache.match(request).then((matching) => {
                if (matching !== undefined) {
                    fetch(request).then(((response) => {
                        if (response.status >= 400) {
                            throw Error('An error has occurred');
                        }
                        return cache.put(request, response.clone()).then(() => response).then(refresh)})
                    ).catch(() => {
                        const e = "offline";
                    })
                }
            }
        ));
}

// Шлём сообщения об обновлении данных всем клиентам.
function refresh(response) {
    return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            // Подробнее про ETag можно прочитать тут
            // https://en.wikipedia.org/wiki/HTTP_ETag
            const message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };
            // Уведомляем клиент об обновлении данных.
            client.postMessage(JSON.stringify(message));
        });
    });
}