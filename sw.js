const staticCacheName = 'cache-v1';
const assets = [
  '/',
  'index.html',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
  '/css/styles.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/restaurant-reviews-app/img/1.jpg',
  '/restaurant-reviews-app/img/2.jpg',
  '/restaurant-reviews-app/img/3.jpg',
  '/restaurant-reviews-app/img/4.jpg',
  '/restaurant-reviews-app/img/5.jpg',
  '/restaurant-reviews-app/img/6.jpg',
  '/restaurant-reviews-app/img/7.jpg',
  '/restaurant-reviews-app/img/8.jpg',
  '/restaurant-reviews-app/img/9.jpg',
  '/restaurant-reviews-app/img/10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
      .then( (cache) => {
        return cache.addAll(assets);
      })
  );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
          .then( (cacheNames) => {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('cache-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
          })
    );
});




self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
