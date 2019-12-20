<template>
    <div class="instrument disable-select">
        <div v-on:click="deleteInstrument" class="instrument-name">{{title}}</div>

        <div class="euclidean-input">
            <range-selector v-for="selector in selectorArr" v-bind:key="selector.id" v-bind:name="selector.name">  
            </range-selector>
            <!-- <div class="input-num">
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value numerator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
                </br><div class="input-label"> STEPS </div> 
                
            </div>
            
            <div class="input-num">
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
                </br><div class="input-label"> PULSES </div>
            </div>
            
            <div class="input-num">
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
                </br>
                <div class="input-label"> OFFSET </div>
            </div> -->
            <div class="instr-knobs">
                <div class='input-knob'>
                    <knob>
                    </knob>
                    </br>
                    VOL
                </div>
                <div class='input-knob'>
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
    data() {
        return {
            selectorArr: [
                {id: 0, name: "STEP", value: 1},
                {id: 1, name: "PULSES", value: 1},
                {id: 2, name: "OFFSET", value: 0},
            ]
        }
    },
    props: ['title' , 'id'],
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