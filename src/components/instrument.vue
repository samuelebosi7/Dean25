<template>
    <div :id="'inst'+id" class="instrument disable-select">
        <div v-on:click="deleteInstrument" class="add-rem-inst rem-inst on-inst">
            <div class="minus-symbol">-</div> 
        </div>
        <div v-on:click="selectInstrument" class="instrument-name">
            {{title}}
            <!-- <span class='arrow'>&#9660;</span> -->
            <ul class="sub-menu genre">
                <li class="genre1">
                    Rock
                    <span>&blacktriangleright;</span>
                    <ul class="sub-menu item genre1">
                        <li>
                            Hi-Hat
                        </li>
                        <li>
                            Kick
                        </li>
                        <li>
                            Snare
                        </li>
                        <li>
                            Cymbal
                        </li>
                    </ul>
                </li>
                <li class="genre2">
                    African
                    <span>&blacktriangleright;</span>
                    <ul class="sub-menu item genre2">
                        <li>
                            Xilofone
                        </li>
                        <li>
                            Djembe
                        </li>
                    </ul>
                </li>
                <li class="genre3">
                    Latino
                    <span>&blacktriangleright;</span>
                    <ul class="sub-menu item genre3">
                        <li>
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

        <div class='meter'>
            <span class="anim"></span>
        </div>
        <div class="euclidean-input">
            <range-selector v-on:upValue="update" v-for="sel in selectorArr" v-bind:key="sel.id" v-bind:selName="sel.name" v-bind:selId="sel.id" v-bind:inVal="sel.initialValue"></range-selector>

            <div class="instr-knobs">
                <div class='input-knob vol'>
                    <knob>
                    </knob>
                    </br>
                    VOL
                </div>
                <div class='input-knob pan'>
                    <knob>
                    </knob>
                    </br>
                    PAN
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
    props: ['title' , 'id'],
    data() {
        return {
            selectorArr: [
                {id: 0, name: "STEPS", val: 1 , initialValue: 1},
                {id: 1, name: "PULSES", val: 1 , initialValue: 1 },
                {id: 2, name: "OFFSET", val: 0 , initialValue: 0},
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
    }
  }
}
// $(document).ready(function() {
//     $(".instrument-name").click(function() {
//         $(".genre").toggleClass("active-inst");
//         return false;
//     });
// });
</script>