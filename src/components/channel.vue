<template>
    <div>
        <button class="control mute active"></button>
        <button class="control pad"></button>
        <div class="control meter vertical">
            <span></span>
        </div>
        <div class="seq-row inline">
            {{numSteps}}
        </div>
    </div>
</template>

<script>
export default {
name: "channel",
 data() {
    return {
      
    }
  },
  props: ["numSteps"],
  methods: { 
    
  }   
}
</script>