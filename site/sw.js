/* Radio Apuseni — service worker
   Rol: permite deschiderea aplicației (fereastra/shell-ul) și offline.
   NU cachează niciodată: streamul live, API-ul now-playing sau fluxurile
   podcast/episoadele audio — acelea sunt fie live, fie stau pe alt domeniu
   (serverul AzuraCast), și trebuie cerute mereu proaspăt din rețea. */

const SHELL_CACHE = "radio-apuseni-shell-v24";

const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./config.js",
  "./licente.html",
  "./manifest.json",
  "./vendor/three.min.js",
  "./assets/logo-radio-apuseni.svg",
  "./assets/radio-apuseni-editorial.webp",
  "./icons/radio-apuseni-192.png",
  "./icons/radio-apuseni-512.png",
  "./icons/radio-apuseni-maskable-512.png",
  "./icons/apple-touch-radio-apuseni.png",
  "./icons/favicon-radio-apuseni-16.png",
  "./icons/favicon-radio-apuseni-32.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* căi care nu se cachează niciodată, chiar dacă ajung pe același domeniu
   (de exemplu printr-un reverse proxy) */
const NEVER_CACHE = ["/listen/", "/api/nowplaying", "/api/feed", "/podcast/", "/stream", "/audio/"];

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // cross-origin (streamul AzuraCast, feed-urile podcast): lăsăm rețeaua
  // să răspundă direct, fără nicio implicare a service worker-ului
  if (url.origin !== self.location.origin) return;

  // căi live/API chiar și same-origin: la fel, direct din rețea
  if (NEVER_CACHE.some((p) => url.pathname.includes(p))) return;

  // restul (shell-ul aplicației): stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
