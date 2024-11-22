const SEQUENCE_LENGTH = 16;

// create an empty sequence
var emptyArray = function() {
  var arr = [];
  for (var i = 0; i < SEQUENCE_LENGTH; i++) {
    arr.push(false);
  }
  return arr;
};


// setInterval replacement
function newSetInterval(fn, duration){
  this.baseline = undefined
  
  this.run = function() {
    if (this.baseline === undefined){
      this.baseline = new Date().getTime()
    }
    fn()

    // refresh duration from the app
    duration = 60000 / (app.bpm*2);

    // is this an on or off beat
    const odd = ((app.pos % 2) !== 0)

    // swing algorithm
    const swing = app.swing
    let percent = 50
    let d
    switch(swing) {
      case '2': percent = 54; break;
      case '3': percent = 58; break;
      case '4': percent = 62; break;
      case '5': percent = 66; break;
      case '6': percent = 71; break;
      case '1':
      default: 
        percent = 50; break;
    }
    percent = 50 + (percent - 50) / 4
    const end = new Date().getTime()
    if (!odd) {
      d = duration * ((100 - percent)/100)
    } else {
      d = duration * (percent/100)
    }

    this.baseline += d
 
    let nextTick = d - (end - this.baseline)
    if (nextTick < 0) {
      nextTick = 0
    }
    (function(i){
        i.timer = setTimeout(function(){
        i.run(end)
      }, nextTick)
    }(this))
  }

  this.stop = function(){
    clearTimeout(this.timer)
  }
}

var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    sequenceLength: SEQUENCE_LENGTH,
    sequence: {
    },
    pos: 0,
    paused: true,
    sounds: {},
    interval: null,
    bpm: 120,
    swing: 1,
    name: '',
    files: [ ],
    mode: 'splash',
    drummachine: 'r8'
  },
  methods: {
    // start the sequence playback
    start: function() {


      if (this.interval === null) {
        this.paused = false;
        
        // calculate time interval from bpm
        var t = 60000 / (this.bpm * 4);

        // start the timer
        this.interval = new newSetInterval(() => {

          // on each tick, play the sound if necessary
          for (var j in this.sequence) {
            if (this.sequence[j][this.pos] && !this.sounds[j].mute) {
              this.sounds[j].sound.play();
            }
          }
          
          // move the position along and wrap around
          this.pos = (this.pos +1) % this.sequenceLength;
        }, t);
        this.interval.run()
      }
    },

    // stop playback
    stop: function() {
      if (this.interval !== null) {
        this.interval.stop()
        this.interval = null;
        this.paused = true;
      }
    },

    // on click of the play button
    onPlay : function() {
      this.start();
    },

    // on click of the stop button
    onStop: function() {
      this.stop();
    },

    // on click of the clear button
    onClear: function() {
      for (var i in this.sounds) {
        Vue.set(this.sequence, i, emptyArray());
      }
    },

    loadSounds: function() {
      // load the sounds
      this.sounds = {
        kicka: { mute: false, sound: new Howl({ src: ['samples/' + this.drummachine + '-Kick.wav']})},
        kickb: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Kick Accent.wav']})},
        snarea: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Snare.wav']})},
        snareb: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Snare Accent.wav']})},
        rim: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Rim Shot.wav']})},
        hihata: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-HiHat.wav']})},
        hihatb: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-HiHat Accent.wav']})},
        hihatc: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-HiHat Metal.wav']})},
        cymbal: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Cymbal.wav']})},
        bongohigh: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Bongo High.wav']})},
        bongolow: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Bongo Low.wav']})},
        congalow: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Conga Low.wav']})},
        cowbell: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Cowbell.wav']})},
        tamb1: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Tamb 1.wav']})},
        tamb2: { mute: false, sound:new Howl({ src: ['samples/' + this.drummachine + '-Tamb 2.wav']})}
      };
    },
    // on click of the 'get started' button
    onGetStarted : function() {
      // load the sounds
      this.loadSounds()
      this.start();
      this.mode='play';
    },

    onClickHome: function() {
      this.stop();
      this.mode='splash'
    }
  },

  // app start up event
  created: function() {

    this.loadSounds()

    // clear the sequence
    for (var i in this.sounds) {
      Vue.set(this.sequence, i, emptyArray());
    }

    // simple back beat
    for (var x=0; x < this.sequenceLength; x+=4) {
      this.sequence.kicka[x] = true;
    }
    for (var x=0; x < this.sequenceLength; x+=1) {
      this.sequence.hihata[x] = true;
    }
    this.getFileList();
    this.mode='splash'
  }
})
