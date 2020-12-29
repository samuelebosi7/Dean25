<template>
    <div>
      <sequencer ref="sequencer" v-on:toggleStepEvent="toggleStep" v-bind:audiox = "audiox" v-bind:recNode = "recNode" v-bind:masterVolume="this.masterVolume" v-bind:binSeq="this.singleChannel.seq" v-bind:mute="this.singleChannel.mute" v-bind:solo="this.singleChannel.solo" v-bind:noteDur="this.singleChannel.noteDuration" v-bind:id="this.singleChannel.id" v-bind:pan="this.singleChannel.pan" v-bind:gain="this.singleChannel.gain" v-bind:url="this.singleChannel.url">  
      </sequencer>
    </div>
</template>

<script>
import Sequencer from './sequencer.vue';
export default {
name: "channel",
 data() {
    return {
    }
  },
  components: {
    Sequencer,
  },
  props: ["singleChannel", "masterVolume" , "audiox" , "recNode"],
  methods: { 
    toggleStep: function (value)
    {
        this.$emit('toggleStepEvent', value); 
    }

  }   
}
</script>