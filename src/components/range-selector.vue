<template>
    <div class='range-selector step'>
                <div v-on:click="decrementValue" class="change-value decrement-value" data-field="quantity">-</div>
                <div class="actual-value" name="quantity">1</div>
                <div  v-on:click="incrementValue" class="change-value increment-value" data-field="quantity">+</div>
                <div class="input-label"> {{name}} </div> 
            </div>
</template>

<script>
export default {
    name: 'range-selector',
    props: ['name'],
    methods:{    
        incrementValue: function(flag , e) {  //flag = 1 ----> step  | flag = 0 ----> pulses
            e.preventDefault();
            var fieldName = $(event.target).data('field');
            var parent = $(e.target).closest('div');
            var currentVal = parseInt(parent.find('div[name=' + fieldName + ']').val(), 10);
            var val = currentVal;
        
            if(!isNaN(currentVal) && currentVal <= 15){
                parent.find('div[name=' + fieldName + ']').val(currentVal + 1);
                val = currentVal+1;
                //this.$refs.input.dispatchEvent(new Event("change"));
                //this.$emit('setStep', {step: currentVal + 1 , id: this.id});
            }else if(isNaN(currentVal)){
                parent.find('div[name=' + fieldName + ']').val(0);
            // this.$refs.input.dispatchEvent(new Event("change"));
            //this.$emit('setStep', {step: 0 , id: this.id});
            }

            if(flag == 1)
                this.step = val;
            else this.pulses = val;
        },

        decrementValue: function( flag , e) {
            e.preventDefault();
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).closest('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
            var val = 1;
        
            if (!isNaN(currentVal) && currentVal > 1) {
                parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
                val = currentVal-1;
            // this.$refs.input.dispatchEvent(new Event("change"));
            //this.$emit('setStep', {step: currentVal - 1 , id: this.id});
            } else {
                parent.find('input[name=' + fieldName + ']').val(1);
            // this.$refs.input.dispatchEvent(new Event("change"));
            //this.$emit('setStep', {step: 1 , id: this.id});
            }

            if(flag == 1)
                this.step = val;
            else this.pulses = val;
        },
    }
}
</script>