
<template>
  <vue-slider v-model="value" v-on:change="changeVolume"></vue-slider>
</template>
 
<script>
import VueSlider from 'vue-slider-component'
//import 'vue-slider-component/theme/antd.css'
 
export default {
    name: 'slider',
  components: {
    VueSlider
  },
  data () {
    return {
      value: 50
    }
  },
  methods:{
    changeVolume: function(){
      this.$emit('changeVolume', {volume: this.value});
      console.log("volume cambiato a "+this.value);
    }
  }
}
</script>