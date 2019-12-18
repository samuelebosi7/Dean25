<template>
    <div>
        <!-- <button class="control mute active"></button>
        <button class="control pad"></button>
        <div class="control meter vertical">
            <span></span>
        </div> -->
        <sequencer v-bind:numStep="this.numSteps">    
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
  props: ["numSteps"],
  methods: { 
    
  }   
}
</script>