<template>
   <div id="container">
      <div id= "instrument-menu">
        <nav id="instument-down-menu">
          <div id="menu">
            <div id="menu-add" v-on:click="addInstrument" class="menu-item">
            </div>
          </div>
        </nav>
      </div>
            
      <div id = "instrument-list">
        <div class="instrument-line" v-for="instrument in instrumentList" v-bind:key="instrument.id">
          <instrument v-on:deleteChannel="deleteChannel" v-on:setStep="updateStep" v-bind:id = "instrument.id" v-bind:title="instrument.title" v-bind:style="{ backgroundColor: instrument.color}"></instrument>
          <channel class="instrument-channel" v-bind:singleChannel="channelList.find(x => x.id === instrument.id)"></channel>
        </div>
      </div>
  </div>
</template>

<script>
import Instrument from './instrument.vue'
import Channel from './channel.vue';

export default {
  name: 'central-part',
  data() {
    return {
      color:'',
      channelList: [],   // {id , seq[]}  seq[] è la sequenza binaria
    }
  },
  components: {
    Instrument,
    Channel
  },
  computed: {
    instrumentList () {
      return this.$store.state.instrumentList;
    }
  },
  created() {
      this.createChannel();
  },
  methods: {

    addInstrument: function (event) {
      var newId = this.getMaxId()+1;
      this.instrumentList.push({ id: newId, title: event.currentTarget.children['0'].innerText , color: Math.floor(Math.random()*16777215).toString(16)});
      this.channelList.push({id: newId , seq: [0]})
    },

    getMaxId: function() {
      console.log(this.instrumentList)
      console.log(this.channelList)
      if(this.instrumentList.length >0)
        return Math.max.apply(Math, this.instrumentList.map(function(o) { return o.id; }));
      else return -1;
    },

    createChannel: function(){
        this.instrumentList.forEach(element => this.channelList.push({id: element.id , seq: [0]}));
    },

    /* updateChannel: function() {
      
        this.instrumentList.forEach(element => this.channelList.push({id: element.id , numSteps: element.steps , seq: [0 , 0 , 0 , 1 , 1]}));
    }, */

    updateStep: function(value) {  //value.step --> step | value.id --> id | value.pulses --> pulses  | value.offset --> offset
        var ary = this.euclidean(value.step, value.pulses);  // qui verrà usato l'agoritmo euclideo
        ary = this.arrayRotate(ary , -value.offset)
        this.channelList.find(x => x.id === value.id).seq = ary;
        console.log(this.channelList)
    },

    euclidean: function(tatum, tactus){
        var rhythm=[1];
        for(var i=1; i<tatum; i++){
          if(Math.floor((tactus/tatum)*i)>Math.floor((tactus/tatum)*(i-1)))
            rhythm[i]=1;
          else
            rhythm[i]=0;
        }

        return rhythm;
    },

    arrayRotate: function(arr, count) {
      count -= arr.length * Math.floor(count / arr.length);
      arr.push.apply(arr, arr.splice(0, count));
      return arr;
    },

    deleteChannel: function(value) {  //value.id --> id 
        var pos = this.channelList.map(function(e) { return e.id; }).indexOf(value.id);
        this.channelList.splice(pos, 1);
    },
  }
}
</script>