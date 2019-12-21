<template>
    <div class="instrument disable-select">
        <div v-on:click="deleteInstrument" class="instrument-name">{{title}}</div>

        <div class='meter'>
            <span class="anim"></span>
        </div>
        <div class="euclidean-input">
            <range-selector v-for="selector in selectorArr" v-bind:key="selector.seqId" v-bind:name="selector.name">  
            </range-selector>

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
                {seqId: 0, name: "STEPS", value: 1 },
                {seqId: 1, name: "PULSES", value: 1 },
                {seqId: 2, name: "OFFSET", value: 0},
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
      this.$emit('deleteChannel', this.id);
    },

    /* updateStep: function(e) {
      //this.$store.commit('setStep', {newStep: e.target.value , id: this.id});
      this.$emit('setStep', {step: e.target.value , id: this.id});
    }, */

    updateValue: function() {
        this.$emit('setStep', {id: this.id, step: this.step , pulses: this.pulses});
    }
  }
}
</script>