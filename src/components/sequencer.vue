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

export default {
name: "sequencer",
 data() {
    return {
      currentStep: -1,
      tatumSeq: 2, //il numero di nextStep che devi ricevere per avanzare di uno
      nextStepReceived: 0,
      //stepNum: this.binSeq.length,
     // oneNum: this.binSeq.filter(x => x==1).length,
    }
  },
  props: ["binSeq", "noteDur"],
  created() {
      EventBus.$on('nextStep', this.scheduleNote);
      EventBus.$on('stopStep', this.stopSeq);
  },
  computed: {
    audiox () {
      return this.$store.state.audiox;
    },

    db () {
      return this.$store.state.db;
    },
  
  },

  watch: {
    noteDur(newValue) {
      this.tatumSeq = newValue;
      console.log(this.tatumSeq);
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
    },

    scheduleNote: function() {
      /*if(this.tatumSeq!=this.noteDur)
      {  
        this.tatumSeq=this.noteDur;
      }*/
      //console.log(this.noteDur);
      this.nextStepReceived++;
      
      if(this.nextStepReceived >= this.tatumSeq){
        this.currentStep++;
        if (this.currentStep >= this.binSeq.length) {
          this.currentStep = 0;
        }

        this.playSine();
        this.nextStepReceived = 0;
      }
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