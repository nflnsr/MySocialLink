const CACHE_NAME = "my-cache";

let urlsToCache = [
  "/",
  "/index.html",
  "/profile",
  "/settings",
  "/assets/index-jbnd5UXw.js",
  "/assets/index-U0WIGWY_.css",
  "/assets/default-pp.jpg",
  "/assets/github.svg",
  "/assets/gmail.svg",
  "/assets/instagram.svg",
  "/assets/linkedin.svg",
  "/assets/whatsapp.svg",
  "/assets/desktop-dark.png",
  "/assets/mobile-dark.png",
  "/assets/desktop-light.png",
  "/assets/mobile-light.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
