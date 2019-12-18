<template>
   <div id="left-part">
      <div id= "instrument-menu">
        <nav id="instument-down-menu">
          <div id="menu">
            <div id="menu-add" v-on:click="addInstrument" class="menu-item">
              <a> 
                <!--<i class="fas fa-plus-square fa-2x"></i>-->
                <div class="circle-plus-symbol">
                  <div class="plus-symbol">+</div> 
                </div> 
                &nbsp; Add instrument
              </a>
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
      this.instrumentList.push({ id: this.getMaxId()+1, title: 'Instrument '+(this.getMaxId()+1) , color: Math.floor(Math.random()*16777215).toString(16), steps: 1});
    },

    getMaxId: function() {
      var idArray = this.instrumentList.map(function(e) { return e.id; })
      return Math.max(...idArray);
    }
  
  }
}
</script>