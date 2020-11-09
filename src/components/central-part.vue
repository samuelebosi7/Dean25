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
          <instrument v-on:upLink="updateLink" v-on:updateGainPan="updateGP" v-on:deleteChannel="deleteChannel" v-on:updateDuration="updateDuration" v-on:changedMute="changeMute" v-on:changedSolo="changeSolo" v-on:setStep="updateStep" v-bind:id ="instrument.id" v-bind:title="instrument.title" v-bind:soloChannel ="channelList.find(x => x.id === instrument.id).solo" v-bind:style="{ backgroundColor: instrument.color}"></instrument>
          <channel class="instrument-channel" v-on:toggleStepEvent="toggleStep" v-bind:audiox = "audiox" v-bind:recNode ="recNode" v-bind:masterVolume="mastVolume" v-bind:singleChannel="channelList.find(x => x.id === instrument.id)"></channel>
        </div>
      </div>
  </div>
</template>

<script>
import { EventBus } from '../app.vue';
import Instrument from './instrument.vue';
import Channel from './channel.vue';
import WAAClock from 'waaclock';
import Recorder from './recorder.js';
import store from '../app.vue'

export default {
  name: 'central-part',
  props: ["mastVolume"],
  data() {
    return {
      color:'',
      channelList: [], // {id , seq[], noteDuration}  seq[] è la sequenza binaria
      cLcm: 1,    //minimo comune multiplo
      count: 0,  //conteggio globale mcm

      //timing var
      audiox : new AudioContext,
      recx: Recorder,
      recNode: null,
      input: {},
      clock: {},
      tickEvent: null,
      updateEvent: 0,
      tic: 0.5,  
      prev:0,
      noteDuration: 0.5, //note duration in seconds
      //totcount: 0,


      // startTime: 0,
      // noteTime: 0,
      // ti: 0,
      
      //play/stop var
      isPlaying: false,
      isStop: true,

      soloInsts: 0,
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
  },
  watch: {
    instrumentList: function () {
      this.updateChannel();
    },
  },
  created() {
      this.createChannel();
      this.clock = new WAAClock(this.audiox);
      this.recNode = this.audiox.createGain();
      this.recNode.connect(this.audiox.destination);

      EventBus.$on('startAudioContext', this.startAudioContext);
      //EventBus.$on('nextStep', this.advanceTic);
      EventBus.$on('playSeq', this.setPlayStop);
      EventBus.$on('stopSeq', this.setPlayStop);
      EventBus.$on('recSeq', this.record);
      EventBus.$on('changeBpm', this.changeBpm);
      EventBus.$on('changedSolo', this.changeSolo);
      EventBus.$on('deleteAllChannels', this.deleteAllChannels);
      
  },
  methods: {

    startAudioContext: function() {
        this.audiox.resume();
    },

    updateLink: function(value) {
        this.channelList.find(x => x.id === value.id).url = value.link;
    },

    createChannel: function(){
      this.instrumentList.forEach(element => this.channelList.push({id: element.id , seq: [1], gain:0.5, pan: 0, noteDuration: 4, mute: 1, solo: 1 , url: ''}));
      //console.log("added inst"+value.id+" with solo to "+this.channelList.find(x => x.id === value.id).solo);
    },

    updateChannel: function() {
        var idArr = this.channelList.map(el => el.id);
        var correctSolo=1;
        if(this.soloInsts>0)
          correctSolo=0;
        console.log("correct solo: "+correctSolo);
        this.instrumentList.forEach(element => (!idArr.includes(element.id)) ? this.channelList.push({id: element.id , seq: [1], gain: 0.5, pan: 0, noteDuration: 4, mute: 1, solo: correctSolo , url: ''}) : {});
        this.channelList.forEach(ch => console.log("inst"+ch.id+" has solo: "+ch.solo));
    }, 

    updateStep: function(value) {  //value.step --> step | value.id --> id | value.pulses --> pulses  | value.offset --> offset
        if(!this.$store.getters.getFreeMode)
        {
            var ary = this.euclidean(value.step, value.pulses);  // qui verrà usato l'agoritmo euclideo
            ary = this.arrayRotate(ary , -value.offset)
            this.channelList.find(x => x.id === value.id).seq = ary;
            this.cLcm = this.lcm(); //updates least common multiple value as steps get added on any instrument.
        } else
        {
            this.channelList.find(x => x.id === value.id).seq.push(0);
            this.cLcm = this.lcm(); //updates least common multiple value as steps get added on any instrument.
        }
    },

    toggleStep: function(value)
    {
        var currentVal = this.channelList.find(x => x.id === value.id).seq[value.pos];

        if (currentVal)
          this.channelList.find(x => x.id === value.id).seq[value.pos] = 0;
        else 
          this.channelList.find(x => x.id === value.id).seq[value.pos] = 1;
    },

    updateDuration: function(value) {
        this.channelList.find(x => x.id === value.id).noteDuration = parseInt(value.dur,10);
        this.noteDuration = this.tic*4/parseInt(value.dur,10);
/* 
        this.updateEvent.clear();
        this.updateEvent = null;
        this.updateEvent = this.clock.callbackAtTime(this.updateCurrentStep, this.audiox.currentTime).repeat(this.noteDuration) */
    },

    changeMute: function(value) {
        var newVal;
        value.mute ? newVal = 0 : newVal= 1;
        this.channelList.find(x => x.id === value.id).mute = newVal;
        //console.log("instrument "+value.id+" changed to "+this.channelList.find(x => x.id === value.id).mute);
    },

    changeSolo: function(value) {
        if(value.solo){
          this.soloInsts++;
          
          if(this.soloInsts==1){
            this.channelList.forEach(ch => { 
              if(ch.id!=value.id){
                ch.solo = 0;
              }
            })
          }
          else
            this.channelList.find(x => x.id === value.id).solo = 1;

          console.log("instrument "+value.id+" changed to "+this.channelList.find(x => x.id === value.id).solo);
          console.log("instruments in solo: "+this.soloInsts);
        }
        else 
        {
          this.soloInsts--;
          if(this.soloInsts<1)
            this.channelList.forEach(ch => {ch.solo = 1})
          else
            this.channelList.find(x => x.id === value.id).solo = 0;
          
          console.log("instrument "+value.id+" changed to "+this.channelList.find(x => x.id === value.id).solo);
          console.log("instruments in solo: "+this.soloInsts);
        }
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

    deleteAllChannels: function() {  
      this.channelList.splice(0, this.channelList.length);
    },

    deleteChannel: function(value) {  //value.id --> id 
      console.log("sono nel delete channel");
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

    // playListener(payload) {
    //   this.setPlayStop(payload.isPlaying , payload.isStop);
    //   //this.play();
    // },

    // stopListener(payload) {
    //   this.setPlayStop(payload.isPlaying , payload.isStop);
    // },

    setPlayStop: function(payload) {
      this.isPlaying = payload.isPlaying ;
      this.isStop = payload.isStop;
      this.play();
    },

    play: function () {
      /* if(this.isStop || !this.isPlaying)
        this.audiox.suspend();
      else this.audiox.resume(); */
      

      if(this.isStop){
        this.suspendClock();
        EventBus.$emit('stopStep');
        return false;
        this.totcount = 0;
      } else if(!this.isPlaying) {
        this.suspendClock();
        EventBus.$emit('pauseStep');
        return false;  //se ho premuto pausa tengo salvato lo step corrente
      }


      //this.startTime = this.audiox.currentTime + 0.005;
      //this.noteTime = 0;
      //this.emitPlaynote();

      this.startClock();
    },

    suspendClock: function() {
        this.clock.stop();

        if(this.tickEvent != null) {
          this.tickEvent.clear();
          this.tickEvent = null;
        }

        if(this.audiox.state === 'running') 
          this.audiox.suspend();
    },

    startClock: function() {
      this.audiox.resume();
      this.clock.start();
      this.tickEvent = this.clock.callbackAtTime(this.handleTick.bind(this), this.audiox.currentTime).repeat(this.tic)
    },

    handleTick: function({deadline}) {
      EventBus.$emit('nextStep' , deadline);
      this.totcount += 1;
    },

    changeBpm: function(payload) {
        this.tic = 60/(payload.newBpm);
        this.suspendClock();
        this.startClock();
    },

    minNoteDur: function() {
      var minNoteDuration = 32;
      this.channelList.forEach(element => {
        if(element.noteDuration < minNoteDuration)
          minNoteDuration = element.noteDuration;
      });
      return minNoteDuration;
    },

    record: function(payload) {
      //recx = new Recorder(this.audiox);
      if(payload.isRecording)
      {
        var minNoteDuration = this.minNoteDur();
        var recordingTime = this.cLcm*this.tic*4/minNoteDuration;

        EventBus.$emit('setRecordingLabel', recordingTime);
        this.setPlayStop({isPlaying: false, isStop: true});

        this.recx = new Recorder(this.recNode);
        this.setPlayStop({isPlaying: true, isStop: false});
        
        this.recx.clear();
        this.recx.record();
        setTimeout(this.stopRecording, recordingTime*1000);

      } else{
         /*  this.recx.stop();
          console.log(this.recx)
          this.recx.exportWAV(this.doneEncoding);
          this.setPlayStop({isPlaying: false, isStop: true}) */;
       }
     },

     stopRecording: function() {
          this.recx.stop();
          this.recx.exportWAV(this.doneEncoding);
          this.setPlayStop({isPlaying: false, isStop: true});
     },

    doneEncoding: function(blob) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        this.$store.commit('setRecordLink', url);
        console.log(url);
    }

  }
}
</script>