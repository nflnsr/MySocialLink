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

  "/assets/LoadingDesktop-hMDe6GWH.js",
  "/assets/LoadingMobile-WH-cbMul.js",
  "/assets/desktop-mLCdlAd5.js",
  "/assets/mobile-B67mzwjE.js",
  "/assets/index-iPEoNYBE.js",
  "/assets/page-f3FpdWIN.js",
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
