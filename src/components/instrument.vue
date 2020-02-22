<template>
    <div :id="'inst'+id" class="instrument disable-select">
        <div v-on:click="deleteInstrument" class="add-rem-inst rem-inst on-inst">
            <div class="minus-symbol">-</div> 
        </div>
        <div v-on:click="selectInstrument" v-bind:title='title' class="instrument-name">
            <div :id="'actualSample'+id">
                Cy
            </div>
            
            <ul class="sub-menu genre">
                <li class="genre1">
                    Rock
                    <span>&blacktriangleright;</span>
                    <ul class="sub-menu item genre1">
                        <li v-on:click="updateSample('Hi-Hat')">
                            Hi-Hat
                        </li>
                        <li v-on:click="updateSample('Kick')">
                            Kick
                        </li>
                        <li v-on:click="updateSample('Snare')">
                            Snare
                        </li>
                        <li v-on:click="updateSample('Cymbals')">
                            Cymbals
                        </li>
                    </ul>
                </li>
                <li class="genre2">
                    African
                    <span>&blacktriangleright;</span>
                    <ul class="sub-menu item genre2">
                        <li v-on:click="updateSample('Xilofone')">
                            Xilofone
                        </li>
                        <li v-on:click="updateSample('Djembe')">
                            Djembe
                        </li>
                    </ul>
                </li>
                <li class="genre3">
                    Latino
                    <span>&blacktriangleright;</span>
                    <ul class="sub-menu item genre3">
                        <li v-on:click="updateSample('Maracas')">
                            Maracas
                        </li>
                    </ul>
                </li>
            </ul>
                <!-- <div class="submenu">
                    <div class="element-in-menu menu-item"><a>Rock</a></div>
                    <div class="element-in-menu menu-item"><a>African</a></div>
                    <div class="element-in-menu menu-item"><a>Oriental</a></div>
                    <div class="element-in-menu menu-item"><a>Latino</a></div>
                </div> -->
        </div>

        <div class="mute" title='Mute'>
            <div v-on:click="MuteClicked" class="mute-button"></div> M
        </div>
        <div class="solo" title='Solo'>
            <div v-on:click="SoloClicked" class="solo-button"></div> S
        </div>
        <div class='meter'>
            <span :id="'spike-bar'+id" class="anim"></span>
        </div>
        <div class="euclidean-input">
            <range-selector v-on:upValue="update" v-for="sel in selectorArr" v-bind:key="sel.id" v-bind:selName="sel.name" v-bind:selId="sel.id" v-bind:inVal="sel.initialValue"></range-selector>

            <div v-on:click="selectNoteDuration" class="noteDuration" title="Note Duration">
                <div :id="'actualDuration'+id">
                /16
                </div>
                <span>&blacktriangledown;</span>
                <ul class="sub-menu genre dur">
                    <li v-on:click="updateDuration(4)">/4</li>
                    <li v-on:click="updateDuration(8)">/8</li>
                    <li v-on:click="updateDuration(16)">/16</li>
                    <li v-on:click="updateDuration(32)">/32</li>
                </ul>
            </div>
            <div class="instr-knobs">
                <div class='input-knob vol'>
                    <knob>
                    </knob>
                    </br>
                    Vol
                </div>
                <div class='input-knob pan'>
                    <knob>
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

export default {
    name: 'instrument',
    props: ['title', 'shortTitle', 'id'],
    data() {
        return {
            selectorArr: [
                {id: 0, name: "Steps", val: 1 , initialValue: 1},
                {id: 1, name: "Pulses", val: 1 , initialValue: 1 },
                {id: 2, name: "Offset", val: 0 , initialValue: 0},
            ],
        }
    },
    components: {
        Knob,
        RangeSelector
    },
    computed: {
        instrumentList () {
        return this.$store.state.instrumentList;
        }
    },
    methods: {
    accessStore: function() {
        console.log(this.$store.state.links[2])
    },
    
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

    selectInstrument: function(e) {
        $(e.target).children("ul").toggleClass("active");
        this.accessStore();
    },

    updateDuration: function(val){
        $('#actualDuration'+this.id).html("/"+val);
        $(".sub-menu.genre").removeClass("active");
        val=32/val;
        this.$emit('updateDuration', {id: this.id, dur: val});
    },

    updateSample: function(val){

        $('#actualSample'+this.id).html(val.substring(0, 2));
        $(".sub-menu.genre").removeClass("active");
        this.title=val;
        //console.log(this.$store.state.links[1])
    },

    MuteClicked: function(){
        document.querySelectorAll(".mute-button")[this.id].classList.toggle("active-mute");
    },

    SoloClicked: function(){
        document.querySelectorAll(".solo-button")[this.id].classList.toggle("active-solo");
    },

    selectNoteDuration: function(e){
        $(e.target).children("ul").toggleClass("active");
    }
  }
}

// $(document).ready(function() {
// });

</script>