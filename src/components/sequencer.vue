<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        <span v-for="step in binSeq" v-on:click="onoff" v-bind:class="{'seq-note': step == 1}" class="seq-ui"></span>
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
      currentStep: 0
      //stepNum: this.binSeq.length,
     // oneNum: this.binSeq.filter(x => x==1).length,
    }
  },
  props: ["binSeq"],
  watch: { 
   /*  binSeq: function() {
      this.stepNum = this.binSeq.length;
      this.oneNum = this.binSeq.filter(x => x==1).length
    } */
  },

  created() {
    /*EventBus.$on('suxstep', (data) => {
      this.currentStep++; 
      console.log(this.currentStep);*/
      EventBus.$on('suxstep', count => {
      console.log(`${count}`)
      }
      );
  },

  methods: { 
    onoff: function(event) {
        event.target.classList.toggle("seq-note");
        }
    },
}
</script>