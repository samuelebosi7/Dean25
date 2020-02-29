<template>
    <div :id="'inst'+id" class="instrument disable-select">
        
        <div v-on:click="deleteInstrument" class="add-rem-inst rem-inst on-inst">
            <div class="minus-symbol">-</div> 
        </div>
        <div v-bind:title='title' class="instrument-name">
            <!-- <div :id="'actualSample'+id" v-on:click="selectInstrument">
                Cy
            </div> -->
            
            <instrument-selector v-bind:id = this.id v-on:updateLink = "updateLink">

            </instrument-selector>
            
        </div>

        <div class="mute" title='Mute'>
            <div v-on:click="MuteClicked" class="mute-button"></div> M
        </div>
        <div class="solo" title='Solo'>
            <div v-on:click="SoloClicked" class="solo-button"></div> S
        </div>
        <div class='meter'>
            <span :id="'spike-bar'+id" class="anim fade" style="transform: scaleY(0)"></span>
        </div>
        <div class="euclidean-input">
            <range-selector v-on:upValue="update" v-for="sel in selectorArr" v-bind:key="sel.id" v-bind:selName="sel.name" v-bind:selId="sel.id" v-bind:inVal="sel.initialValue"></range-selector>

            <div class="noteDuration" title="Note Duration">
                <div :id="'actualDuration'+id" v-on:click="selectNoteDuration">
                /16
                </div>
                <span v-on:click="selectNoteDuration">&blacktriangledown;</span>
                <ul class="sub-menu genre dur">
                    <li v-on:click="updateDuration(4)">/4</li>
                    <li v-on:click="updateDuration(8)">/8</li>
                    <li v-on:click="updateDuration(16)">/16</li>
                    <li v-on:click="updateDuration(32)">/32</li>
                </ul>
            </div>
            <div class="instr-knobs">
                <div class='input-knob vol'>
                    <knob v-on:updateValueKnob="updateGain">
                    </knob>
                    </br>
                    Vol
                </div>
                <div class='input-knob pan'>
                    <knob v-on:updateValueKnob="updatePan">
                    </knob>
                    </br>
                    Pan
                </div>
            </div>
        </div>
            
        <div class="instument-tools">
        </div>
    </div>
</template>


<script>
import Knob from "./knob.vue";
import RangeSelector from "./range-selector.vue";
import InstrumentSelector from "./instrument-selector.vue";

export default {
    name: 'instrument',
    props: ['title', 'shortTitle', 'id'],
    data() {
        return {
            sampleLoaded: 0,
            selectorArr: [
                {id: 0, name: "Steps", val: 1 , initialValue: 1},
                {id: 1, name: "Pulses", val: 1 , initialValue: 1 },
                {id: 2, name: "Offset", val: 0 , initialValue: 0},
            ],
            gain: 0.5,
            pan: 0,
            mute: 1, // 1 -> mute disabilitato, 0 -> mute abilitato
            solo: false // true -> attivo, false -> disattivo
        }
    },
    components: {
        Knob,
        RangeSelector,
        InstrumentSelector,
    },
    computed: {
        instrumentList () {
            return this.$store.state.instrumentList;
        },

        links () {
            return this.$store.state.links;
        },

    },

    created(){
       //this.accessStore();
       //console.log("ciao" + this.$store.state.links);
    },

    methods: {

    deleteInstrument: function () {
      var pos = this.instrumentList.map(function(e) { return e.id; }).indexOf(this.id);
      this.instrumentList.splice(pos, 1);
      this.$emit('deleteChannel', {id: this.id});
    },

    update: function (value) {
        this.selectorArr.find(x => x.id === value.select_id).val = value.inputVal;
        this.updateValue();
    },
    
    updateValue: function() {
        this.$emit('setStep', {id: this.id, step: this.selectorArr[0].val, pulses: this.selectorArr[1].val , offset: this.selectorArr[2].val });
    },

    updateDuration: function(val){
        $('#actualDuration'+this.id).html("/"+val);
        $(".sub-menu.genre").removeClass("active");
        val=32/val;
        this.$emit('updateDuration', {id: this.id, dur: val});
    },

    updateLink: function(val){
        this.$emit("upLink" , {id: this.id , link: val});
    },

    MuteClicked: function(){
        document.querySelectorAll(".mute-button")[this.id].classList.toggle("active-mute");
        if(document.querySelectorAll(".solo-button")[this.id].classList.contains("active-solo"))
            document.querySelectorAll(".solo-button")[this.id].classList.toggle("active-solo")
        if(this.mute==1)
            this.mute=0;
        else
            this.mute=1;
        this.$emit('changedMute', {id: this.id, mute: this.mute});
        //this.accessStore();
    },

    SoloClicked: function(){ 
        if(document.querySelectorAll(".mute-button")[this.id].classList.contains("active-mute"))
        {
            document.querySelectorAll(".mute-button")[this.id].classList.toggle("active-mute");
            this.mute=1;
        }
        document.querySelectorAll(".solo-button")[this.id].classList.toggle("active-solo");
        this.solo=!this.solo; 
        this.$emit('changedSolo', {id: this.id, solo: this.solo});
    },

    selectNoteDuration: function(e){
        $(e.target).parent("div").children("ul").toggleClass("active");
    },

    updatePan: function(value){
        this.pan = value;
        this.$emit("updateGainPan", {id:this.id, gain: this.gain, pan:this.pan});
    },
    
    updateGain: function(value){
        this.gain = value;
        this.$emit("updateGainPan", {id:this.id, gain: this.gain, pan:this.pan});
    }
  }
}

//  $(document).ready(function() {
//     this.accessStore();
//  });

</script>