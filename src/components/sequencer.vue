<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        <span v-for="(step,index) in binSeq" v-on:click="onoff" v-bind:class="{'seq-note': step == 1, 'seq-playhead': index == currentStep }" class="seq-ui"></span>
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
      currentStep: -1,
      tatumSeq: 2, //il numero di nextStep che devi ricevere per avanzare di uno
      tatumDefault: 1,
      nextStepReceived: 0,
      p: 0,
      g: 0,
      data: {},
      //stepNum: this.binSeq.length,
     // oneNum: this.binSeq.filter(x => x==1).length,
     clock: {},
    }
  },
  props: ["id","binSeq", "noteDur", "pan", "gain", "mute", "solo", "masterVolume" , "url"],
  created() {
      EventBus.$on('nextStep', this.scheduleNote);
      EventBus.$on('stopStep', this.stopSeq);
      this.audioChannel();
  },
  computed: {
    audiox () {
      return this.$store.state.audiox;
    },

    db () {
      return this.$store.state.db;
    },

    storage () {
      return this.$store.state.storage;
    },
  
  },

  watch: {
    noteDur(newValue) {
      this.tatumSeq = newValue;
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
    
    }
  },

  beforeDestroy(){
     EventBus.$off('nextStep', this.scheduleNote);
  },
  methods: { 
    onoff: function(event) {
        event.target.classList.toggle("seq-note");
    },

    stopSeq:function() {
      this.currentStep = -1;
      this.nextStepReceived = 0;
    },

    audioChannel: function() {
      //this.source = this.audiox.createBufferSource();
      this.p = this.audiox.createStereoPanner();
      this.g = this.audiox.createGain();
      this.g.gain.value=this.masterVolume/100;
      this.g.connect(this.p);
      this.p.connect(this.audiox.destination);
    },

    scheduleNote: function(deadline) {
      var tat;
      if(this.currentStep == -1)
        tat = this.tatumDefault;
      else tat = this.tatumSeq;

      this.nextStepReceived++;
      
      if(this.nextStepReceived >= tat){
        this.currentStep++;
        if (this.currentStep >= this.binSeq.length) {
          this.currentStep = 0;
        }
        this.playStep(deadline);
        this.nextStepReceived = 0;
      }
    },
    
    playStep: function(deadline) {
      if (this.binSeq[this.currentStep]==1) {
        var bar=$("#spike-bar"+this.id)
        bar.removeClass('fade');
        bar.css('transform', 'scaleY('+(this.gain)*(this.masterVolume/100)+')');
        setTimeout(function() {
          bar.addClass('fade');
          bar.css('transform', 'scaleY(0)');  
        }, 50);
        this.playSample(deadline);
      }
    },

    playSample: function(deadline) {
      var source = this.audiox.createBufferSource();
      source.buffer = this.data.buffer;
      source.connect(this.g);
      source.start(deadline);
    },

    getData: function(url, audioCtx , b) {
      console.log("starting")
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

    }

    },
}
</script>