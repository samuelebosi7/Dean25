<template>
    <div class="instrument disable-select">
        <span class="instrument-name">{{title}}</span>
        <i v-on:click="deleteInstrument" class="deleteIns fas fa-minus-square fa-2x"></i>

        <div class="euclidean-input">
            <div class="input-num">
                <span class="input-label"> STEPS </span> <!--</br>-->
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value numerator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
            
            <div class="input-num">
                <span class="input-label"> PULSES </span> <!--</br>-->
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
            
            <div class="input-num"><span class="input-label"> OFFSET </span> <!--</br>-->
                <input v-on:click="decrementValue" type="button" value="-" class="button-minus" data-field="quantity">
                <input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator">
                <input v-on:click="incrementValue" type="button" value="+" class="button-plus" data-field="quantity">
            </div>
        </div>
            
        <div class="instument-tools">
                <knob></knob>
        </div>
    </div>
</template>


<script>
export default {
    name: 'instrument',
    props: ['title' , 'id'],
    methods: {
    
    deleteInstrument: function () {
        var pos = app.instrumentList.map(function(e) { return e.id; }).indexOf(this.id);
        app.instrumentList.splice(pos, 1);
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