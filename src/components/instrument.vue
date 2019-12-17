<template>
    <div class="instrument disable-select">
        <span v-on:click="deleteInstrument" class="instrument-name">{{title}}</span>
        <i class="deleteIns fas fa-minus-square fa-2x" ></i>

        <div class="euclidean-input">
            <div class="input-num">
                <span class="input-label"> STEPS </span> </br>
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value numerator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
            
            <div class="input-num">
                <span class="input-label"> PULSES </span> </br>
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
            
            <div class="input-num"><span class="input-label"> OFFSET </span> </br>
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
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
    methods: {
    
    deleteInstrument: function () {
        this.$emit('deleteChildInstrument', this.id);
    },

    incrementValue: function(e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    
        if(!isNaN(currentVal) && currentVal <= 15){
        parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
        }else if(isNaN(currentVal)){
        parent.find('input[name=' + fieldName + ']').val(0);
        }
    },

    decrementValue: function(e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
    
        if (!isNaN(currentVal) && currentVal > 1) {
        parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
        parent.find('input[name=' + fieldName + ']').val(1);
        }
    }
  }
}
</script>