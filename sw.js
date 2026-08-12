const CACHE = "azimut-v8-1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./icon-1024.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(
        ASSETS.map(url =>
          fetch(url, { cache: "reload" })
            .then(response => {
              if (response.ok) return cache.put(url, response.clone());
            })
            .catch(() => {})
        )
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  // HTML/navigation: toujours tenter le réseau d'abord.
  // Ainsi une nouvelle version GitHub Pages remplace immédiatement l'ancienne.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put("./index.html", copy));
          }
          return response;
        })
        .catch(() =>
          caches.match("./index.html").then(cached => cached || caches.match("./"))
        )
    );
    return;
  }

  // sw.js et manifest ne doivent jamais rester bloqués dans un ancien cache.
  const url = new URL(request.url);
  if (url.pathname.endsWith("/sw.js") || url.pathname.endsWith("/manifest.webmanifest")) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Images/icônes: cache rapide, réseau en secours.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
