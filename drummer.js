
const SEQUENCE_LENGTH = 32;

var emptyArray = function() {
  var arr = [];
  for (var i = 0; i < SEQUENCE_LENGTH; i++) {
    arr.push(0);
  }
  return arr;
};


var app = new Vue({
  el: '#app',
  data: {
    sequenceLength: SEQUENCE_LENGTH,
    sequence: {
    },
    pos: 0,
    paused: false,
    sounds: {},
    interval: null,
    bpm: 120
  },
  methods: {
    start: function() {
      this.paused = false;
      var t = 60000 / (this.bpm * 4);
      if (this.interval === null) {
        this.interval = setInterval(() => {
          for (var j in this.sequence) {
            if (this.sequence[j][this.pos] && !this.sounds[j].mute) {
              this.sounds[j].sound.play();
            }
          }
          this.pos = (this.pos +1) % this.sequenceLength;
        }, t);
      }
    },
    stop: function() {
      if (this.interval !== null) {
        clearInterval(this.interval);
        this.interval = null;
        this.paused = true;
      }
    },
    onPlay : function() {
      this.start();
    },
    onStop: function() {
      this.stop();
    },
    onClear: function() {
      for (var j in this.sequence) {
        this.sequence[j] = emptyArray();
      }
    },
    onBpm: function() {
      this.stop();
      this.start();
    }
  },
  created: function() {
    console.log('here');

    this.sounds = {
      kicka: { mute: false, sound: new Howl({ src: ['samples/Kick.wav']})},
      kickb: { mute: false, sound:new Howl({ src: ['samples/Kick Accent.wav']})},
      snarea: { mute: false, sound:new Howl({ src: ['samples/Snare.wav']})},
      snareb: { mute: false, sound:new Howl({ src: ['samples/Snare Accent.wav']})},
      rim: { mute: false, sound:new Howl({ src: ['samples/Rim Shot.wav']})},
      hihata: { mute: false, sound:new Howl({ src: ['samples/HiHat.wav']})},
      hihatb: { mute: false, sound:new Howl({ src: ['samples/HiHat Accent.wav']})},
      hihatc: { mute: false, sound:new Howl({ src: ['samples/HiHat Metal.wav']})},
      cymbal: { mute: false, sound:new Howl({ src: ['samples/Cymbal.wav']})},
      bongohigh: { mute: false, sound:new Howl({ src: ['samples/Bongo High.wav']})},
      bongolow: { mute: false, sound:new Howl({ src: ['samples/Bongo Low.wav']})},
      congalow: { mute: false, sound:new Howl({ src: ['samples/Conga Low.wav']})},
      cowbell: { mute: false, sound:new Howl({ src: ['samples/Cowbell.wav']})},
      tamb1: { mute: false, sound:new Howl({ src: ['samples/Tamb 1.wav']})},
      tamb2: { mute: false, sound:new Howl({ src: ['samples/Tamb 2.wav']})}
    };

    for (var i in this.sounds) {
      this.sequence[i] = emptyArray();
    }
    for (var x=0; x < this.sequenceLength; x+=4) {
      this.sequence.kicka[x] = 1;
    }
    this.start();
  }
})

/*
var i = 0;
setInterval(function() {
  //console.log(app.sequence.kick);
  i = app.pos;
  for (var j in app.sequence) {
    if (app.sequence[j][i] && !app.sounds[j].mute) {
      app.sounds[j].sound.play();
    }
  }
  i++;
  i = i % SEQUENCE_LENGTH;
}, 125);*/