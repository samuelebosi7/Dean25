<template>
  <div id="app">
    <top-bar></top-bar>
    <div id = "central-part">
      <div id = "table-view">
        <principal-table></principal-table>
      </div>

      <left-part></left-part>
    </div>
    <div id = "mixer"></div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import LeftPart from './components/left-part.vue'
import TopBar from './components/top-bar.vue'
import PrincipalTable from './components/principal-table.vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    instrumentList: [
      { id: 0, title: 'Instrument 0' , color:'red', steps: 1 },
      { id: 1, title: 'Instrument 1' , color: 'blue', steps: 1},
      { id: 2, title: 'Instrument 2' , color: 'orange', steps: 1}]
  },
  mutations: {
      setStep (state , payload) {
        state.instrumentList.find(x => x.id === payload.id).steps = payload.newStep;
    }

  }
})

export default {
  data() {
    return {
      message: ' World',
    };
  },
  store,
  components: {
    LeftPart,
    TopBar,
    PrincipalTable
  }
}
</script>
