// 1. Nombre de la "caja" donde guardaremos los archivos
const cacheName = 'v1';

// 2. Lista de archivos que queremos que funcionen sin internet
const assets = ['./', './index.html'];

// 3. Evento de Instalación: Se ejecuta la primera vez que se abre la app
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Guardando archivos en caché...');
      return cache.addAll(assets);
    })
  );
});

// 4. Evento Fetch: Cada vez que la app pide un archivo, 
// el Service Worker revisa si ya lo tiene guardado para no tener que bajarlo de nuevo.
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request); // Si está en caché, úsalo. Si no, ve a internet.
    })
  );
});