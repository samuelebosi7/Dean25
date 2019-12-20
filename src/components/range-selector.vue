<template>
    <div class='range-selector' :class="name">
        <div v-on:click="decrementValue" class="change-value decrement-value" data-field="quantity">-</div>
        <input min='0' max='16' class="actual-value" name="quantity" value="1">
        <div v-on:click="incrementValue" class="change-value increment-value" data-field="quantity">+</div>
        <div class="input-label"> {{name}} </div> 
    </div>
</template>

<script>
export default {
    name: 'range-selector',
    props: ['name, id'],
    data() {
        return {
        }
    },
    methods:{    
        incrementValue: function(e) { 
            e.preventDefault();
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).parent('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
            var cval = 0;
        
            if (!isNaN(currentVal) && currentVal <= 31) {
                parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
                cval = currentVal;
            } else if(isNaN(currentVal)) {
                parent.find('input[name=' + fieldName + ']').val(0);
                cval = currentVal;
            }
        this.$emit('upValue', {select_id: this.id, inputVal: cval});
        },

        decrementValue: function(e) {
            e.preventDefault();
            var fieldName = $(e.target).data('field');
            var parent = $(e.target).parent('div');
            var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
        
            if (!isNaN(currentVal) && currentVal > 1) {
                parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
            } else {
                parent.find('input[name=' + fieldName + ']').val(1);
            }
        },
    }
}
</script>