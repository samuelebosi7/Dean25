<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        <span v-for="(step,index) in binSeq" v-on:click="onoff" v-bind:class="{'seq-note': step == 1, 'seq-playhead': index == currentStep && !isStop }" class="seq-ui"></span>
        <!-- in realta non è un errore -->
      </div>
    </div>
</template>

<script>
import { EventBus } from '../app.vue';

export default {
name: "sequencer",
 data() {
    return {
      currentStep: 0,
      startTime: 0,
      noteTime: 0,
      ti: 0,
      tic: 0.1,
      isPlaying: false,
      isStop: true,
      //stepNum: this.binSeq.length,
     // oneNum: this.binSeq.filter(x => x==1).length,
    }
  },
  props: ["binSeq"],
  computed: {
    audiox () {
      return this.$store.state.audiox;
    },
  },
  created() {

    EventBus.$on('playSeq', this.playListener);

    EventBus.$on('stopSeq', this.stopListener);

  },
  beforeDestroy(){
     EventBus.$off('playSeq', this.playListener);
    console.log("seq destroyed");
  },
  methods: { 
    onoff: function(event) {
        event.target.classList.toggle("seq-note");
    },

    playListener(payload) {
      this.setPlayStop(payload.isPlaying , payload.isStop);
      this.play();
    },

    stopListener(payload) {
      this.setPlayStop(payload.isPlaying , payload.isStop);
    },

    setPlayStop: function(isPlaying , isStop) {
      this.isPlaying = isPlaying;
      this.isStop = isStop;
    },

    play: function () {
      if(this.isStop || !this.isPlaying)
        this.audiox.suspend();
      else this.audiox.resume();
      
      this.startTime = this.audiox.currentTime + 0.005;
      this.noteTime = 0;
      console.log("start-time in play: "+  this.startTime);
      this.scheduleNote();
    },

    scheduleNote: function() {
      if(this.isStop){
        this.currentStep = 0; //se ho premuto stop torno al primo step
        return false;
      } else if(!this.isPlaying) return false;  //se ho premuto pausa tengo slavato lo step corrente
      
      var ct = this.audiox.currentTime;
      ct -= this.startTime;

      while(this.noteTime < ct + 0.200) {
        
        this.currentStep++;
        if (this.currentStep >= this.binSeq.length) {
          this.currentStep = 0;
        }
        
        this.playSine();
        this.noteTime += this.tic; 
      }
    
      this.ti = setTimeout(this.scheduleNote, 0);
    },
    
    playSine: function() {
      if (this.binSeq[this.currentStep]==1) {
        this.sine();
      }
      //else console.log("porcodio"); 
    },

    sine: function() {
      var o = this.audiox.createOscillator();
      var g = this.audiox.createGain();
      o.connect(g);
      g.connect(this.audiox.destination);
      o.start();
      g.gain.setValueAtTime(0.25,this.audiox.currentTime);
      //g.gain.linearRampToValueAtTime(0.25,this.audiox.currentTime+0.5);
      g.gain.linearRampToValueAtTime(0,this.audiox.currentTime+0.5);
    }
    },
}
</script>