<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        <span v-for="step in binSeq" v-on:click="onoff" v-bind:class="{'seq-note': step == 1}" class="seq-ui"></span>
        <!-- in realta non è un errore -->
      </div>
    </div>
</template>

<script>
export default {
name: "sequencer",
 data() {
    return {
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

  methods: { 
    onoff: function(event) {
        event.target.classList.toggle("seq-note");
        }
    },
}
</script>