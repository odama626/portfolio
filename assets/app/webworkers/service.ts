const CACHE_NAME = 'omarzion_portfolio_v0.2.0';

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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
})

self.addEventListener('message', event => {
  // console.log(event.data);
})
