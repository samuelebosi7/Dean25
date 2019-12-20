<template>
    <div class='range-selector' :class="name">
        <div v-on:click="decrementValue" class="change-value decrement-value" data-field="quantity">-</div>
        <input class="actual-value" name="quantity" value="1">
        <div v-on:click="incrementValue" class="change-value increment-value" data-field="quantity">+</div>
        <div class="input-label"> {{name}} </div> 
    </div>
</template>

<script>
export default {
    name: 'range-selector',
    props: ['name'],
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
        
            if (!isNaN(currentVal) && currentVal <= 15) {
                parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
            } else {
                parent.find('input[name=' + fieldName + ']').val(0);
            }
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