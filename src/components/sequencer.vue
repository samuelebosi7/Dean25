<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        <span v-for="(step,index) in binSeq" v-on:click="onoff" v-bind:class="{'seq-note': step == 1, 'seq-playhead': index == currentStep && isPlaying }" class="seq-ui"></span>
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
      tic: 1,
      //stepNum: this.binSeq.length,
     // oneNum: this.binSeq.filter(x => x==1).length,
    }
  },
  props: ["binSeq"],
  watch: {
    isPlaying: function () {
      if(!this.isPlaying) {
        this.stop();
      }
      else {
        this.play();
      }
    }
    },
  
  computed: {
    audiox () {
      return this.$store.state.audiox;
    },

    isPlaying () {
      return this.$store.state.isPlaying
    }
    },

  methods: { 
    onoff: function(event) {
        event.target.classList.toggle("seq-note");
    },

    /*stop: function() {
      this.isPlaying = false;
    },*/

    play: function () {
      this.audiox.resume();
      //this.isPlaying = !this.isPlaying;
      //console.log('playing: ' + this.isPlaying);
      this.startTime = this.audiox.currentTime + 0.005;
      this.scheduleNote();
    },

    scheduleNote: function() {
      if(!this.isPlaying) return false;
      var ct = this.audiox.currentTime;
      ct -= this.startTime;
      while(this.noteTime < ct + 0.200) {
      //console.log(this.currentStep);
      this.currentStep++;
      if (this.currentStep >= this.binSeq.length) 
      {
        this.currentStep = 0;
      }
      this.noteTime += this.tic;
    }
    this.ti = setTimeout(this.scheduleNote, 0);
    }
    },
}
</script>