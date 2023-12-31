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

  "/assets/LoadingDesktop-N9ULLX5v.js",
  "/assets/desktop-vt54pfHb.js",
  "/assets/index-1nwqPfN_.js",
  "/assets/page-NuP9inAn.js",
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
      if (!response) {
        return fetch(event.request);
      }
      const date = new Date(response.headers.get("date"));
      // if cached file is older than 7 days, fetch a new one
      if (Date.now() > date.getTime() + 1000 * 60 * 60 * 24 * 30) {
        return fetch(event.request);
      }
      // else return cached version
      return response;
    })
  );
});
