<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        {{numStep}}
        <span v-for="index in stepNum" v-bind:key="index" class="seq-ui"></span>
      </div>
    </div>
</template>

<script>
export default {
name: "sequencer",
 data() {
    return {
      stepNum: this.binSeq.length,
      oneNum: this.binSeq.filter(x => x==1).length,
    }
  },
  props: ["binSeq"],
  watch: { 
    binSeq: function() {
      this.stepNum = this.binSeq.length;
      this.oneNum = this.binSeq.filter(x => x==1).length
    }
  },
}
</script>