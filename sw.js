self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('drummer').then(function(cache) {
      return cache.addAll([
        'index.html',
        'drummer.css',
        'drummer.js',
        'img/cr78.png',
        'samples/cr78-Bongo High.wav',
        'samples/cr78-Bongo Low.wav',
        'samples/cr78-Conga Low.wav',
        'samples/cr78-Cowbell.wav',
        'samples/cr78-Cymbal.wav',
        'samples/cr78-Guiro 1.wav',
        'samples/cr78-Guiro 2.wav',
        'samples/cr78-HiHat Accent.wav',
        'samples/cr78-HiHat Metal.wav',
        'samples/cr78-HiHat.wav',
        'samples/cr78-Kick Accent.wav',
        'samples/cr78-Kick.wav',
        'samples/cr78-Rim Shot.wav',
        'samples/cr78-Snare Accent.wav',
        'samples/cr78-Snare.wav',
        'samples/cr78-Tamb 1.wav',
        'samples/cr78-Tamb 2.wav',
        'samples/r8-Bongo High.wav',
        'samples/r8-Bongo Low.wav',
        'samples/r8-Conga Low.wav',
        'samples/r8-Cowbell.wav',
        'samples/r8-Cymbal.wav',
        'samples/r8-Guiro 1.wav',
        'samples/r8-Guiro 2.wav',
        'samples/r8-HiHat Accent.wav',
        'samples/r8-HiHat Metal.wav',
        'samples/r8-HiHat.wav',
        'samples/r8-Kick Accent.wav',
        'samples/r8-Kick.wav',
        'samples/r8-Rim Shot.wav',
        'samples/r8-Snare Accent.wav',
        'samples/r8-Snare.wav',
        'samples/r8-Tamb 1.wav',
        'samples/r8-Tamb 2.wav',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
        'https://code.jquery.com/jquery-2.2.4.js',
        'https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.4/howler.min.js',
        'https://cdn.jsdelivr.net/npm/vue',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js',
        'https://cdn.jsdelivr.net/npm/pouchdb@7.1.1/dist/pouchdb.min.js',
        'https://cdn.jsdelivr.net/npm/pouchdb@7.1.1/dist/pouchdb.find.min.js'
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