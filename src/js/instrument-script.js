
Vue.component('instrument', {
  props: ['title' , 'id'],
  template: '<div class="instrument"><span class="instrument-name">{{title}}</span><i v-on:click="deleteInstrument" class="deleteIns fas fa-minus-square fa-2x"></i><div class="euclidean-input"><div class="input-num"><span class="input-label"> STEPS </span> </br><input type="button" value="-" class="button-minus" data-field="quantity"><input type="number" step="1" max="" value="1" name="quantity" class="num-value numerator"><input type="button" value="+" class="button-plus" data-field="quantity"></div><div class="input-num"><span class="input-label"> PULSES </span> </br><input type="button" value="-" class="button-minus" data-field="quantity"><input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator"><input type="button" value="+" class="button-plus" data-field="quantity"></div><div class="input-num"><span class="input-label"> OFFSET </span> </br><input type="button" value="-" class="button-minus" data-field="quantity"><input type="number" step="1" max="" value="1" name="quantity" class="num-value denominator"><input type="button" value="+" class="button-plus" data-field="quantity"></div></div><div class="instument-tools"></div></div>',
  methods: {
    deleteInstrument: function () {
        var pos = app.instrumentList.map(function(e) { return e.id; }).indexOf(this.id);
        app.instrumentList.splice(pos, 1);
    }
  }
})

Vue.component('in-row', {
  props: ['title' , 'id'],
  template: '',
  methods: {
    
  }
})


var app = new Vue({
  el: "#app",
  data: {
    color:'',
    instrumentList: [
    { id: 0, title: 'Instrument 0' , color:'red' },
    { id: 1, title: 'Instrument 1' , color: 'blue'},
    { id: 2, title: 'Instrument 2' , color: 'orange'}]
  },
  
  methods: {
    addInstrument: function () {
      this.instrumentList.push({ id: this.instrumentList.length, title: event.currentTarget.children['0'].innerText , color: Math.floor(Math.random()*16777215).toString(16)});
  }}

})



window.onload= function load() {
  document.querySelectorAll(".button-minus").forEach(function(b){b.onclick = decrementValue})
  document.querySelectorAll(".button-plus").forEach(function(b){b.onclick = incrementValue})
};

function incrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);
  
    if(!isNaN(currentVal) && currentVal <= 15){
      parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
    }else if(isNaN(currentVal)){
      parent.find('input[name=' + fieldName + ']').val(0);
    }
  }
  
  function decrementValue(e) {
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
  