<template>
    <div class="instrument disable-select">
        <div v-on:click="deleteInstrument" class="instrument-name">{{title}}</div>

        <div class="euclidean-input">
            <div class='range-selector step'>
                <div class="change-value decrement-value">-</div>
                <div class="actual-value">1</div>
                <div class="change-value increment-value">+</div>
                <div class="input-label"> STEPS </div> 
            </div>
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

export default {
    name: 'instrument',
    props: ['title' , 'id'],
    components: {
        Knob
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
    },

    incrementValue: function(e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    
        if(!isNaN(currentVal) && currentVal <= 15){
            parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
            this.$store.commit('setStep' , {newStep: currentVal+1 , id: this.id});
        }else if(isNaN(currentVal)){
            parent.find('input[name=' + fieldName + ']').val(0);
            this.$store.commit('setStep' ,{newStep: 0 , id: this.id});
        }
    },

    decrementValue: function(e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    
        if (!isNaN(currentVal) && currentVal > 1) {
            parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
            this.$store.commit('setStep', {newStep: currentVal-1 , id: this.id});
        } else {
            parent.find('input[name=' + fieldName + ']').val(1);
            this.$store.commit('setStep' ,{newStep: 1 , id: this.id});
        }
    }
  }
}
</script>