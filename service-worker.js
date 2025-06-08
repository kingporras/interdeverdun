const CACHE_NAME = "interverdun-b-v1";
const urlsToCache = [
  "index.html",
  "style.css",
  "manifest.json",
  "js/jugadores-data.js",
  "js/perfiles.js",
  "js/convocatoria.js",
  "assets/escudo_192x192.png",
  "assets/escudo_512x512.png"
  // Puedes añadir más archivos aquí si los necesitas
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
