<template>
  <div id="app">
    <top-bar></top-bar>
    <div id = "central-part">
      <central-part></central-part>
    </div>
    <div id = "mixer"></div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import CentralPart from './components/central-part.vue'
import TopBar from './components/top-bar.vue'
export const EventBus = new Vue();

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    audiox : new AudioContext,
    instrumentList: [
      { id: 0, title: 'Instrument 0' , shortTitle: 'I'/*, color:'red'*/},
      { id: 1, title: 'Instrument 1' , shortTitle: 'I'/*, color: 'blue'*/},
      { id: 2, title: 'Instrument 2' , shortTitle: 'I'/*, color: 'orange'*/}]
  },
})

export default {
  data() {
    return {
      message: ' World',
    };
  },
  store,
  components: {
    CentralPart,
    TopBar
  }
}
</script>
