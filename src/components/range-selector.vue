<template>
    <div class='range-selector' :class="selName">
        <div v-on:click="decrementValue" class="change-value decrement-value" data-field="quantity">-</div>
        <input min='0' max='16' class="actual-value" name="quantity" value="1">
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
    props: ['selName' , 'selId'],
    methods:{    
        incrementValue: function(e) { 
            e.preventDefault();
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).parent('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
            var cval = currentVal;
        
            if (!isNaN(currentVal) && currentVal <= 31) {
                parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
                cval = currentVal+1;
            } else if(isNaN(currentVal)) {
                parent.find('input[name=' + fieldName + ']').val(0);
                cval = 0;
            }
            this.$emit('upValue', {select_id: this.selId, inputVal: cval});
        },

        decrementValue: function(e) {
            e.preventDefault();
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).parent('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
            var cval = currentVal;
        
            if (!isNaN(currentVal) && currentVal > 1) {
                parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
                cval = currentVal-1;
            } else {
                parent.find('input[name=' + fieldName + ']').val(1);
                cval = 1;
            }

            this.$emit('upValue', {select_id: this.selId, inputVal: cval});
        },
    }
}
</script>