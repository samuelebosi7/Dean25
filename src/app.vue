<template>
  <div id="app">
  </div>
</template>

<script>
import Instrument from './components/instrument.vue'
export default {
  name: 'app',
  data: {
    color:'',
    instrumentList: [
    { id: 0, title: 'Instrument 0' , color:'red' },
    { id: 1, title: 'Instrument 1' , color: 'blue'},
    { id: 2, title: 'Instrument 2' , color: 'orange'}]
  },

  methods: {
    addInstrument: function () {
      this.instrumentList.push({ id: this.instrumentList.length, title: event.currentTarget.children['0'].innerText , color: Math.floor(Math.random()*16777215).toString(16)});
  }}
}
</script>
