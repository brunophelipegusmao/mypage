const CACHE_VERSION = "corelayer-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_SHELL = [
  "/",
  "/contact",
  "/portfolio",
  "/services",
  "/pwa/manifest.webmanifest",
  "/web/favicon.ico",
  "/web/apple-touch-icon-180x180.png",
  "/pwa/icon-192x192.png",
  "/pwa/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (isCacheableAsset(requestUrl.pathname)) {
    event.respondWith(cacheFirst(event.request));
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isCacheableAsset(pathname) {
  if (pathname.startsWith("/_next/static/")) {
    return true;
  }

  if (pathname.startsWith("/pwa/") || pathname.startsWith("/web/")) {
    return true;
  }

  return /\.(?:js|css|png|jpg|jpeg|gif|svg|ico|webp|avif|woff2?|ttf|json)$/i.test(
    pathname,
  );
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const shell = await caches.match("/");
    if (shell) {
      return shell;
    }

    return Response.error();
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  const cache = await caches.open(RUNTIME_CACHE);
  cache.put(request, networkResponse.clone());
  return networkResponse;
}
