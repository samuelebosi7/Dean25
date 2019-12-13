<template>
  <div id="app">
    <top-bar></top-bar>
    <div id = "central-part">
      <div id = "table-view">
        <div id= "principal-table">
          <!-- <in-row v-for="instrument in instrumentList" v-bind:key="instrument.id"></in-row> -->
        </div>
      </div>
      
      <left-part></left-part>
    </div>
    <div id = "mixer"></div>
  </div>
</template>

<script>
import LeftPart from './components/left-part.vue'
import TopBar from './components/top-bar.vue'

export default {
  data() {
    return {
      message: ' World',
    };
  },

  components: {
    LeftPart,
    TopBar
  }
}
</script>
