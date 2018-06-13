const CACHE_NAME = 'omarzion_portfolio_v1.2.0';

const urlsToCache = [
  '/',
  '/res/main.js',
  '/res/main.css',

  // faces
  '/res/face-logo.svg',
  '/res/face-logo-think.svg',

  '/res/fonts/portfolio.woff?rf8m2',
  '/res/fonts/portfolio.ttf?rf8m23',

  // optimized images
  '/res/optimize/x100/galaxy.jpg',
  '/res/optimize/galaxy.jpg',
  '/res/optimize/400x225/preview_pomo.png',
  '/res/optimize/400x225/preview_calc.png',
  '/res/optimize/400x225/preview_quote.png',
  '/res/optimize/400x225/preview_vis.png',
  '/res/optimize/400x225/preview_weather.png',

  // Icons
  "/res/icons/apple-touch-icon.png",
  "/res/icons/favicon-32x32.png",
  "/res/icons/favicon-16x16.png",
  "/res/icons/safari-pinned-tab.svg",
  "/res/icons/favicon.ico",

  // manifest
  "/res/icons/site.webmanifest",
]

self.addEventListener('install', (event: any) => {
  // console.log('installing sw');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`opened cache ${CACHE_NAME}`);
        return cache.addAll(urlsToCache)
      }).catch(e => console.log(e))
  );
  // console.log('Service worker installing');
})

self.addEventListener('activate', event => {
  // console.log('Service worker activating.');
})

self.addEventListener('fetch', (event: any) => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl: any = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});

// self.addEventListener('fetch', (event: any) => {
//   event.respondWith(fromCache(event.request));
//   event.waitUntil(update(event.request))
// });

// function fromCache(request) {
//   return caches.open(CACHE_NAME).then(cache => {
//     let match = cache.match(request);
//     if (match) {
//       return match;
//     }
//     return fetch(request);
//   })
// }

// function update(request) {
//   return caches.open(CACHE_NAME).then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response.clone()).then(function () {
//         return response;
//       });
//     });
//   });
// }

self.addEventListener('message', event => {
  // console.log(event.data);
})
