<template>
   <dial v-on:mousedown="move" id="prova"></dial> 
</template>

<script>
export default {
name: "knob",
 data() {
    return {
      degree: 0,
      val: 0,
    }
  },

  watch:{
    val(value) {
      this.$emit('updateValueKnob', (value+160)/320);
    }
  },

  methods: { 
    move: function (e) {
      var clicky = e.clientY;
      var target = e.target;
      var pd = 0;
      $("body").on("mousemove", {ref: this} ,function(e) {
           var clip = function (x,y,z, max, min) {
            if ((x+y-z)<=min) {
                return min;
            }else if ((x+y-z)>= max) {
              return max;
            }
              return x+y-z;
          }	

          pd = clip(e.data.ref.degree , e.pageY*3,clicky*3, 160, -160);
          e.data.ref.val = pd;

          if (e.which == 1){
            target.style.transform = "rotate(" + pd + "deg)";
            //$("dial").css("transform","rotate(" + pd + "deg)");
          }else {  
            e.data.ref.degree = pd;
            $("body").off();
          }
      });
  }}   
}
</script>