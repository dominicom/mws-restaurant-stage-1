const staticCacheName = 'cache-v1';
const assets = [
  '/restaurant-review-app/',
  '/restaurant-review-app/index.html',
  '/restaurant-review-app/restaurant.html?id=1',
  '/restaurant-review-app/restaurant.html?id=2',
  '/restaurant-review-app/restaurant.html?id=3',
  '/restaurant-review-app/restaurant.html?id=4',
  '/restaurant-review-app/restaurant.html?id=5',
  '/restaurant-review-app/restaurant.html?id=6',
  '/restaurant-review-app/restaurant.html?id=7',
  '/restaurant-review-app/restaurant.html?id=8',
  '/restaurant-review-app/restaurant.html?id=9',
  '/restaurant-review-app/restaurant.html?id=10',
  '/restaurant-review-app/css/styles.css',
  '/restaurant-review-app/css/responsive.css',
  '/restaurant-review-app/js/main.js',
  '/restaurant-review-app/js/dbhelper.js',
  '/restaurant-review-app/js/restaurant_info.js',
  '/restaurant-review-app/data/restaurants.json',
  '/restaurant-review-app/img/1.jpg',
  '/restaurant-review-app/img/2.jpg',
  '/restaurant-review-app/img/3.jpg',
  '/restaurant-review-app/img/4.jpg',
  '/restaurant-review-app/img/5.jpg',
  '/restaurant-review-app/img/6.jpg',
  '/restaurant-review-app/img/7.jpg',
  '/restaurant-review-app/img/8.jpg',
  '/restaurant-review-app/img/9.jpg',
  '/restaurant-review-app/img/10.jpg'
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
