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
  props: ["id","binSeq", "noteDur", "pan", "gain"],
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
  
  },

  watch: {
    noteDur(newValue) {
      this.tatumSeq = newValue;
    },
    
    pan(value) {
      this.p.pan.linearRampToValueAtTime((value*2)-1, this.audiox.currentTime+0.025);
    },
    
    gain(value) {
      this.g.gain.linearRampToValueAtTime(value, this.audiox.currentTime+0.025);
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
        console.log("entrato in "+this.id);
        var bar=$("#spike-bar"+this.id)
        bar.removeClass('fade');
        bar.css('transform', 'scaleY(1)');
        setTimeout(function() {
          bar.addClass('fade');
          bar.css('transform', 'scaleY(0)');  
        }, 50);

        //this.sine();
      }
    },

    audioChannel: function() {
      this.p = this.audiox.createStereoPanner();
      this.g = this.audiox.createGain();
      this.g.connect(this.p);
      this.p.connect(this.audiox.destination);
      /*g.gain.linearRampToValueAtTime(this.gain, this.audiox.currentTime+0.025);
      p.pan.linearRampToValueAtTime(this.pan, this.audiox.currentTime+0.025);*/
    }
    },
}
</script>