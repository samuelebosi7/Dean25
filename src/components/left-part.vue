<template>
   <div id="left-part">
      <div id= "instrument-menu">
        <nav id="instument-down-menu">
          <div id="menu">
            <div id="menu-add" class="menu-item">
              <a> <i class="fas fa-plus-square fa-2x"></i> &nbsp; Add instrument</a>
                <div id="submenu">
                  <div v-on:click="addInstrument" class="instrument-in-menu menu-item"><a>Instrument 1</a></div>
                  <div v-on:click="addInstrument" class="instrument-in-menu menu-item"><a>Instrument 2</a></div>
                  <div v-on:click="addInstrument" class="instrument-in-menu menu-item"><a>Instrument 3</a></div>
                  <div v-on:click="addInstrument" class="instrument-in-menu menu-item"><a>Instrument 4</a></div>
                </div>
            </div>
          </div>
        </nav>
      </div>
            
      <div id = "instrument-list">
        <instrument v-for="instrument in instrumentList" v-bind:key="instrument.id" v-bind:id = "instrument.id" v-bind:title="instrument.title" v-bind:style="{ backgroundColor: instrument.color}"></instrument>
      </div>
  </div>
</template>

<script>
import Instrument from './instrument.vue'

export default {
  name: 'left-part',
  data() {
    return {
      color:'',
    }
  },
  components: {
    Instrument
  },
  computed: {
    instrumentList () {
      return this.$store.state.instrumentList;
    }
  },
  methods: {

    addInstrument: function (event) {
      this.instrumentList.push({ id: this.getMaxId()+1, title: event.currentTarget.children['0'].innerText , color: Math.floor(Math.random()*16777215).toString(16), steps: 1});
    },

    getMaxId: function() {
      var idArray = this.instrumentList.map(function(e) { return e.id; })
      return Math.max(...idArray);
    }
  
  }
}
</script>