const SEQUENCE_LENGTH = 32;

// create an empty sequence
var emptyArray = function() {
  var arr = [];
  for (var i = 0; i < SEQUENCE_LENGTH; i++) {
    arr.push(false);
  }
  return arr;
};

// setup the database
var db = new PouchDB('drummer');

var app = new Vue({
  el: '#app',
  data: {
    sequenceLength: SEQUENCE_LENGTH,
    sequence: {
    },
    pos: 0,
    paused: true,
    sounds: {},
    interval: null,
    bpm: 120,
    name: '',
    files: [ ],
    mode: 'splash'
  },
  methods: {
    // start the sequence playback
    start: function() {


      if (this.interval === null) {
        this.paused = false;
        
        // calculate time interval from bpm
        var t = 60000 / (this.bpm * 4);

        // start the timer
        this.interval = setInterval(() => {

          // on each tick, play the sound if necessary
          for (var j in this.sequence) {
            if (this.sequence[j][this.pos] && !this.sounds[j].mute) {
              this.sounds[j].sound.play();
            }
          }
          
          // move the position along and wrap around
          this.pos = (this.pos +1) % this.sequenceLength;
        }, t);
      }
    },

    // stop playback
    stop: function() {
      if (this.interval !== null) {
        clearInterval(this.interval);
        this.interval = null;
        this.paused = true;
      }
    },

    // retrieve a list of documents from the database
    getFileList: function() {
      this.files = [];
      db.find({ selector: {}, fields: ['_id']}).then((data) => {
        if (data && data.docs) {
          for(var i in data.docs) {
            this.files.push(data.docs[i]._id);
          }
        }
      });
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

    // on click of the bpm button
    onBpm: function() {
      this.stop();
      this.start();
    },

    // on click of the sequence length buttons
    onSeqLen: function() {
      this.stop();
      this.start();
    },

    // on click of the load button
    onLoad: function() {
      $('#loadModal').modal('show')
    },

    // on click of the save button
    onSave: function() {
      if (this.name) {
        var obj = {
          _id: this.name,
          sequenceLength: this.sequenceLength,
          sequence: this.sequence,
          bpm: this.bpm,
          name: this.name
        };
        db.get(obj._id).then((data) => {
          obj._rev = data._rev;
          return db.put(obj);
        }).catch(() => {
          return db.put(obj);
        }).then(() => {
          this.getFileList();
        });
      }
    },

    // when the user chooses to load a sequence from the database
    onModalLoad: function() {
      db.get(this.name).then((data) => {
        this.name = data.name;
        this.sequenceLength = data.sequenceLength,
        this.sequence = data.sequence,
        this.bpm = data.bpm;
        this.stop();
        this.start();
        $('#loadModal').modal('hide')
      });
    },

    // on click of the 'get started' button
    onGetStarted : function() {
      $('#welcome').hide();
      $('#sequence').show();
      this.start();
      this.mode='play';
    },

    onClickHome: function() {
      this.stop();
      $('#welcome').show();
      $('#sequence').hide();  
      this.mode='splash'
    }
  },

  // app start up event
  created: function() {

    // load the sounds
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

    // clear the sequence
    for (var i in this.sounds) {
      Vue.set(this.sequence, i, emptyArray());
    }

    // simple back beat
    for (var x=0; x < this.sequenceLength; x+=4) {
      this.sequence.kicka[x] = true;
    }
    this.getFileList();

    $('#startupModal').modal('show')
  }
})