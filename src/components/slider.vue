
<template>
  <vue-slider v-model="volume" v-on:change="changeVolume"></vue-slider>
</template>
 
<script>
import VueSlider from 'vue-slider-component'
//import 'vue-slider-component/theme/antd.css'

export default {
    name: 'slider',
  components: {
    VueSlider
  },

  data() {
    return {
      volume:50
    }
  },

  // computed: {
  //   volume:function(){
  //     console.log(this.value);
  //     return this.value;
  //   }
  // },

  methods:{
    changeVolume: function(){
      this.$emit('changeVolume', {volume: this.volume});
    },
  }
}
</script>