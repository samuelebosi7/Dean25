<template>
    <div class="instrument disable-select">
        <span v-on:click="deleteInstrument" class="instrument-name">{{title}}</span>
        <i class="deleteIns fas fa-minus-square fa-2x" ></i>

        <div class="euclidean-input">
            <div class="input-num">
                <span class="input-label"> STEPS </span> </br>
                <input v-on:click="decrementValue(true , $event)" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value numerator">
                <input v-on:click="incrementValue(true , $event)" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
            
            <div class="input-num">
                <span class="input-label"> PULSES </span> </br>
                <input v-on:click="decrementValue(false , $event)" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue(false , $event)" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
            
            <div class="input-num"><span class="input-label"> OFFSET </span> </br>
                <input v-on:click="decrementValue(false , $event)" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue(false , $event)" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
            <knob>
            </knob>
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

    incrementValue: function(isSet , e) {
        e.preventDefault();
        var fieldName = $(event.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    
        if(!isNaN(currentVal) && currentVal <= 15){
            parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
            if(isSet)
                this.$store.commit('setStep' , {newStep: currentVal+1 , id: this.id});
        }else if(isNaN(currentVal)){
            parent.find('input[name=' + fieldName + ']').val(0);
            if(isSet)
            this.$store.commit('setStep' ,{newStep: 0 , id: this.id});
        }
    },

    decrementValue: function( isSet , e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    
        if (!isNaN(currentVal) && currentVal > 1) {
            parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
            if(isSet)
                this.$store.commit('setStep', {newStep: currentVal-1 , id: this.id});
        } else {
            parent.find('input[name=' + fieldName + ']').val(1);
            if(isSet)
            this.$store.commit('setStep' ,{newStep: 1 , id: this.id});
        }
    }
  }
}
</script>