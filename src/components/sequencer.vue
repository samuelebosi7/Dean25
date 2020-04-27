<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        <span v-for="(step,index) in binSeq" v-on:click="onoff" v-bind:class="{'seq-note': step == 1, 'seq-playhead': index == localStep }" class="seq-ui"></span>
        <!-- in realta non è un errore -->
      </div>
    </div>
</template>

<script>
import { EventBus } from '../app.vue';
import WAAClock from 'waaclock'

export default {
name: "sequencer",
 data() {
    return {
      localStep: -1,  // step used for graphic render
      currentStep: 0, // step used for audio schedule
      tatumSeq: 4, //la durata della nota
      noteDuration: 0.5, //note duration in seconds
      tic: 0.5,
      playGain: 0, // node gain after the source, used to stop sound
      timerId: 0,  // timer ide for graphic render
      p: 0,
      g: 0,
      data: {},
      prev: 0,
      clock: {},
      updateEvent: null,
    }
  },
  props: ["id","binSeq", "noteDur", "pan", "gain", "mute", "solo", "masterVolume" , "url", "audiox"],
  created() {
      EventBus.$on('nextStep', this.scheduleNote);
      EventBus.$on('stopStep', this.stopSeq);
      EventBus.$on('pauseStep', this.pauseSeq);
      EventBus.$on('changeBpm', this.changeBpm);
      this.audioChannel();
      this.clock = new WAAClock(this.audiox);
  },
  computed: {

    storage () {
      return this.$store.state.storage;
    },
  
  },

  watch: {
    noteDur(newValue) {
      this.tatumSeq = newValue;
      this.noteDuration = this.tic*4/this.tatumSeq;
      
      //TODO controllare il current step che non sempre è corretto
      //reset the clock and update the note duration
      this.suspendClock();
      this.startClock();
    },
    
    pan(value) {
      this.p.pan.linearRampToValueAtTime((value*2)-1, this.audiox.currentTime+0.025);
    },
    
    gain(value) {
      this.g.gain.linearRampToValueAtTime(this.mute*(value*2)*(this.masterVolume/100), this.audiox.currentTime+0.025);
    },

    masterVolume(value) {
      this.g.gain.linearRampToValueAtTime(this.mute*(this.gain*2)*(value/100), this.audiox.currentTime+0.025);
    },

    mute(value){
      this.g.gain.linearRampToValueAtTime(value*(this.gain*2)*(this.masterVolume/100), this.audiox.currentTime+0.025);
    },

    url(value) {
      var gsReference = this.storage.refFromURL(value);
      gsReference.getDownloadURL().then(url => {
        this.getData(url, this.audiox, this.data);
        }).catch(function(error) {
        // Handle any errors
      });
    },
      
    solo(value){
       this.g.gain.linearRampToValueAtTime(this.mute*(this.gain*2)*(this.masterVolume/100), this.audiox.currentTime+0.025);
    },

  },

  beforeDestroy(){
     EventBus.$off('nextStep', this.scheduleNote);
  },

  methods: { 

    onoff: function(event) {
        event.target.classList.toggle("seq-note");
    },

    stopSeq:function() {
      this.currentStep = 0;
      this.localStep = -1;
      this.suspendClock();
    },

    pauseSeq: function() {
      this.suspendClock();
    },

    changeBpm: function(payload) {
        this.suspendClock();
        this.tic = 60/(payload.newBpm);
        this.noteDuration = this.tic*4/this.tatumSeq;
        this.startClock();
    },

    suspendClock: function() {
        this.clock.stop();

        if(this.updateEvent != null ) {
          this.updateEvent.clear();
          this.updateEvent = null;
        }
    },

    startClock: function() {
        this.clock.start();
        this.updateEvent = this.clock.callbackAtTime(this.updateCurrentStep, this.audiox.currentTime).repeat(this.noteDuration);
    },

//------------------AUDIO CHAIN------------------------------

    audioChannel: function() {
      this.p = this.audiox.createStereoPanner();
      this.g = this.audiox.createGain();
      this.playGain = this.audiox.createGain();
      this.playGain.gain.value=1;
      this.g.gain.value=this.masterVolume/100;

      this.playGain.connect(this.g);
      this.g.connect(this.p);
      this.p.connect(this.audiox.destination);
    },

//------------------SCHEDULE------------------------------
  
    scheduleNote: function(deadline) {
      var that = this;
      var seqlen = this.binSeq.length;
      var len = this.tatumSeq/4;
      var subSeq = this.rotation(this.binSeq , this.currentStep).slice(0 , len);

      for(var i = 0 ; i <len - this.binSeq.length ; i++)
        subSeq = subSeq.concat(subSeq);

      subSeq = subSeq.slice(0 , len);   // si può migliorare
      subSeq.forEach((el, i) => {
        if (el==1) 
          this.playSample(deadline + i*this.noteDuration);
      });

      if(this.updateEvent == null) {
        this.startClock();
      }
      
      this.currentStep = (this.currentStep+len) % this.binSeq.length;
    },

    updateCurrentStep: function() {
      this.localStep = (this.localStep+1) % this.binSeq.length;
    },


    playSample: function(playTime) {
      var source = this.audiox.createBufferSource();
      source.buffer = this.data.buffer;
      source.connect(this.playGain);
      source.start(playTime);
      this.playGain.gain.setValueAtTime(1 , playTime)
      this.playGain.gain.linearRampToValueAtTime(0 , playTime + this.noteDuration-0.01);
    },


//------------------UTILITY------------------------------

    rotation: function(arrData, position) {
      var newArr = arrData.slice();
      var arrLen = newArr.length;

      var num = (position < 0)
                ? arrLen-(position%arrLen)
                : position%arrLen;

      var tempArr = newArr.splice(0, num);
      newArr.push.apply(newArr, tempArr);

      return newArr;
    },

    spikeBar: function() {
      var bar=$("#spike-bar"+this.id)
      bar.removeClass('fade');
      bar.css('transform', 'scaleY('+(this.gain)*(this.masterVolume/100)+')');
      setTimeout(function() {
        bar.addClass('fade');
        bar.css('transform', 'scaleY(0)');  
      }, 50);
    },

    getData: function(url, audioCtx , b) {
      var request = new XMLHttpRequest();

      request.open('GET', url, true);

      request.responseType = 'arraybuffer';

      request.onload = function() {
        var audioData = request.response;
        audioCtx.decodeAudioData(audioData, function(buffer) {
          b.buffer = buffer;
        },
        
        function(e){ console.log("Error with decoding audio data" + e.err); });
      }
      request.send();

    },

    },
}
</script>