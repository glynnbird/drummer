self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('drummer').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/drummer.css',
        '/drummer.js',
        '/img/cr78.png',
        '/samples/Bongo High.wav',
        '/samples/Bongo Low.wav',
        '/samples/Conga Low.wav',
        '/samples/Cowbell.wav',
        '/samples/Cymbal.wav',
        '/samples/Guiro 1.wav',
        '/samples/Guiro 2.wav',
        '/samples/HiHat Accent.wav',
        '/samples/HiHat Metal.wav',
        '/samples/HiHat.wav',
        '/samples/Kick Accent.wav',
        '/samples/Kick.wav',
        '/samples/Rim Shot.wav',
        '/samples/Snare Accent.wav',
        '/samples/Snare.wav',
        '/samples/Tamb 1.wav',
        '/samples/Tamb 2.wav',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
        'https://code.jquery.com/jquery-2.2.4.js',
        'https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.min.js',
        'https://unpkg.com/vue@2.4.2',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js',
        'https://cdn.jsdelivr.net/gh/pouchdb/pouchdb@6.3.4/dist/pouchdb.find.min.js'
      ]);
    })
  );
 });

// cache then network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});