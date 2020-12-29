
<template>
  <vue-slider v-model="volume" v-on:change="changeVolume"></vue-slider>
</template>
 
<script>
import VueSlider from 'vue-slider-component'

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

  methods:{
    changeVolume: function(){
      this.$emit('changeVolume', {volume: this.volume});
    },
  }
}
</script>