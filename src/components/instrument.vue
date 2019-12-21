<template>
    <div class="instrument disable-select">
        <div v-on:click="deleteInstrument" class="instrument-name">{{title}}</div>

        <div class='meter'>
            <span class="anim"></span>
        </div>
        <div class="euclidean-input">
            <range-selector v-on:upValue="update" v-for="sel in selectorArr" v-bind:key="sel.id" v-bind:selName="sel.name" v-bind:selId="sel.id"></range-selector>

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
                {id: 0, name: "STEPS", val: 1 },
                {id: 1, name: "PULSES", val: 1 },
                {id: 2, name: "OFFSET", val: 0},
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
        this.$emit('setStep', {id: this.id, step: this.selectorArr[0].val, pulses: this.selectorArr[1].val});
    }
  }
}
</script>