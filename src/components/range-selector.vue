<template>
    <div class='range-selector' :class="selName">
        <div v-on:click="decrementValue" class="change-value decrement-value" data-field="quantity">-</div>
        <input v-on:change="inputChange" min='0' max='16' class="actual-value" name="quantity" :value="this.inVal">
        <div v-on:click="incrementValue" class="change-value increment-value" data-field="quantity">+</div>
        <div class="input-label"> {{selName}}</div> 
    </div>
</template>

<script>
export default {
    name: 'range-selector',
    data() {
        return {
        }
    },
    props: ['selName' , 'selId' , 'inVal'],
    methods:{    
        incrementValue: function(e) { 
            e.preventDefault();
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).parent('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
            var cval = currentVal;
        
            if (!isNaN(currentVal) && currentVal <= 31) {
                cval = currentVal+1;
            } else if(isNaN(currentVal)) {
                cval = 1;
            }
            
            parent.find('input[name=' + fieldName + ']').val(cval);
            this.updateInstrument(cval);
        },

        decrementValue: function(e) {
            e.preventDefault();
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).parent('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
            var cval = currentVal;
        
            if (!isNaN(currentVal) && currentVal > 1) {
                cval = currentVal-1;
            } else if(this.selId == 2){
                cval = 0;
            } else cval = 1;
            

            parent.find('input[name=' + fieldName + ']').val(cval);
            this.updateInstrument(cval);
        },

        inputChange: function(e) {
            this.updateInstrument(e.target.value);
        },

        updateInstrument: function(val) {
            this.$emit('upValue', {select_id: this.selId, inputVal: val});
        }
    }
}
</script>