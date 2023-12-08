const CACHE_NAME = "my-cache";

let urlsToCache = [
  "/",
  "/index.html",
  "/profile",
  "/settings",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icon.png",
  "/assets/logo.png",

  "/assets/LoadingDesktop-Kyq0xXjj.js",
  "/assets/desktop-R4KZouVo.js",
  "/assets/page-bdHF2DR3.js",
  "/assets/index-ZHIzr7hR.js",
  "/assets/index-7TPxHqXz.css",
  "/assets/page-Lm8SCt9v.css",
  
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
