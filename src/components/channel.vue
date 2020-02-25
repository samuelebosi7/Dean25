<template>
    <div>
        <!-- <button class="control mute active"></button>
        <button class="control pad"></button>
        <div class="control meter vertical">
            <span></span>
        </div> -->
        <sequencer v-bind:masterVolume="this.masterVolume" v-bind:binSeq="this.singleChannel.seq" v-bind:noteDur="this.singleChannel.noteDuration" v-bind:id="this.singleChannel.id" v-bind:pan="this.singleChannel.pan" v-bind:gain="this.singleChannel.gain">  
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
  props: ["singleChannel", "masterVolume"],
  methods: { 
    
  }   
}
</script>