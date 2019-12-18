<template>
<div id="wrap" class="seq-ui">
  <div class="seq-ui seq-row inline">
        {{numStep}}
        <span v-for="index in numStep" v-bind:key="index" class="seq-ui"></span>
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
  props: ["numStep"],  
}
</script>