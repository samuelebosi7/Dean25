<template>
   <div id="container">
      <div id= "instrument-menu">
        <nav id="instument-down-menu">
          <div id="menu">
          </div>
        </nav>
      </div>
            
      <div id = "instrument-list">
        <div class="instrument-line" v-for="instrument in instrumentList" v-bind:key="instrument.id">
          <instrument v-on:updateGainPan="updateGP" v-on:deleteChannel="deleteChannel" v-on:updateDuration="updateDuration" v-on:changedMute="changedMute" v-on:changedSolo="changedSolo" v-on:setStep="updateStep" v-bind:id = "instrument.id" v-bind:title="instrument.title" v-bind:style="{ backgroundColor: instrument.color}"></instrument>
          <channel class="instrument-channel" v-bind:masterVolume="mastVolume" v-bind:singleChannel="channelList.find(x => x.id === instrument.id)"></channel>
        </div>
      </div>
  </div>
</template>

<script>
import { EventBus } from '../app.vue';
import Instrument from './instrument.vue';
import Channel from './channel.vue';

export default {
  name: 'central-part',
  props: ["mastVolume"],
  data() {
    return {
      color:'',
      channelList: [], // {id , seq[], noteDuration}  seq[] è la sequenza binaria
      cLcm: 0,    //minimo comune multiplo
      count: 0,  //conteggio globale mcm

      //timing var
      startTime: 0,
      noteTime: 0,
      ti: 0,
      tic: 0.0625,
      //play/stop var
      isPlaying: false,
      isStop: true,
    }
  },
  components: {
    Instrument,
    Channel
  },
  computed: {
    instrumentList () {
      return this.$store.state.instrumentList;
    },
    audiox () {
      return this.$store.state.audiox;
    },
  },
  watch: {
    instrumentList: function () {
      this.updateChannel();
    },
  },
  created() {
      this.createChannel();

      EventBus.$on('playSeq', this.playListener);
      EventBus.$on('stopSeq', this.stopListener);
      EventBus.$on('changeBpm', this.changeBpm);
  },
  methods: {

    createChannel: function(){
        this.instrumentList.forEach(element => this.channelList.push({id: element.id , seq: [1], gain:0.5, pan: 0, noteDuration: 2, mute: 1, solo:false}));
    },

    updateChannel: function() {
        var idArr = this.channelList.map(el => el.id);
        this.instrumentList.forEach(element => (!idArr.includes(element.id)) ? this.channelList.push({id: element.id , seq: [1], gain: 0.5, pan: 0, noteDuration: 2, mute: 1, solo:false}) : {});
    }, 

    updateStep: function(value) {  //value.step --> step | value.id --> id | value.pulses --> pulses  | value.offset --> offset
        var ary = this.euclidean(value.step, value.pulses);  // qui verrà usato l'agoritmo euclideo
        ary = this.arrayRotate(ary , -value.offset)
        this.channelList.find(x => x.id === value.id).seq = ary;
        this.cLcm = this.lcm(); //updates least common multiple value as steps get added on any instrument.
    },

    updateDuration: function(value) {
        this.channelList.find(x => x.id === value.id).noteDuration = parseInt(value.dur,10);
        //console.log("instrument "+value.id+" changed to "+this.channelList.find(x => x.id === value.id).noteDuration);
        // this.noteDuration=parseInt(value.dur,10);
    },

    changedMute: function(value) {
        this.channelList.find(x => x.id === value.id).mute = value.mute;
        //console.log("instrument "+value.id+" changed to "+this.channelList.find(x => x.id === value.id).mute);
    },

    changedSolo: function(value) {
        //this.channelList.find(x => x.id === value.id).solo = value.mute;
        var alrSolo=false;
          console.log("lo strumento selezionato è "+value.id+" ha solo "+value.solo);
        //this.channelList.find(x => x.id === value.id).solo = value.solo;
        this.channelList.forEach(x => {
          if(x.solo)
            alrSolo=true;
        })

        if(!alrSolo)
        {
          this.channelList.forEach(x => {
            if(x.id!=value.id)
            {
              if(x.mute==1)
                x.mute=0;
              else
                x.mute=1;
            }
            else
              x.solo=value.solo;
            console.log("lo strumento "+x.id+" ha solo "+x.solo+" e mute "+x.mute);
          })
        }
        else{
          //this.channelList.find(x => x.id === value.id)=!(this.channelList.find(x => x.id === value.id));
          this.channelList.find(x => x.id === value.id).function() {
            x.solo=!x.solo;
            if(x.mute==1)
              x.mute=0;
            else
              x.mute=1;
          };
          console.log("lo strumento "+x.id+" ha solo "+x.solo+" e mute "+x.mute);
        }
        //console.log("instrument "+value.id+" changed to "+this.channelList.find(x => x.id === value.id).mute);
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
    
    lcm: function () {
      var input_array= this.channelList.map(function(e) { return e.seq.length; });
      //console.log(input_array);
          if (toString.call(input_array) !== "[object Array]")  
              return  false;  
            var r1 = 0, r2 = 0;
                var l = input_array.length;
                for(var i=0;i<l;i++) {
                    r1 = input_array[i] % input_array[i + 1];
                    if(r1 === 0) {
                        input_array[i + 1] = (input_array[i] * input_array[i+1]) / input_array[i + 1];
                    }
                    else {
                        r2 = input_array[i + 1] % r1;
                        if(r2 === 0) {
                            input_array[i + 1] = (input_array[i] * input_array[i + 1]) / r1;
                        }
                        else {
                            input_array[i+1] = (input_array[i] * input_array[i + 1]) / r2;
                        }
                    }
                }
                return input_array[l - 1];
    },
    updateGP: function(value) {
      this.channelList.find(x => x.id === value.id).pan = value.pan;
      this.channelList.find(x => x.id === value.id).gain = value.gain;
    },

    //TIMING

    playListener(payload) {
      this.setPlayStop(payload.isPlaying , payload.isStop);
      this.play();
    },

    stopListener(payload) {
      this.setPlayStop(payload.isPlaying , payload.isStop);
    },

    setPlayStop: function(isPlaying , isStop) {
      this.isPlaying = isPlaying;
      this.isStop = isStop;
      this.play();
    },

    play: function () {
      if(this.isStop || !this.isPlaying)
        this.audiox.suspend();
      else this.audiox.resume();
      
      this.startTime = this.audiox.currentTime + 0.005;
      this.noteTime = 0;
      this.emitPlaynote();
    },

    emitPlaynote:  function() {
       if(this.isStop){
        EventBus.$emit('stopStep');
        return false;
      } else if(!this.isPlaying) return false;  //se ho premuto pausa tengo slavato lo step corrente
      
      var ct = this.audiox.currentTime;
      ct -= this.startTime;

      while(this.noteTime < ct + this.tic) {
        EventBus.$emit('nextStep');
        this.noteTime += this.tic; 
      }
      this.ti = setTimeout(this.emitPlaynote, 0);
    },

    changeBpm: function(payload) {
        this.tic = 60/(payload.newBpm*8);
    },
    
  }
}
</script>