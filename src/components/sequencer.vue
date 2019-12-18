<template>
  <div class="channel seq-ui">
  <div class="seq-ui seq-row inline">
        {{numStep}}
        <span v-for="index in numStep" v-bind:key="index" v-on:click="onoff" class="seq-ui"></span>
      </div>
    </div>
</template>

<script>
export default {
name: "sequencer",
 data() {
    return {
      
    }
  },

  methods: { 
    onoff: function(event) {
        event.target.classList.toggle("seq-note");
        }
    },

  props: ["numStep"],  
}
</script>