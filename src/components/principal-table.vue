<template>
   <div id= "principal-table">
        <!-- <channel v-for="channel in channelList" v-bind:key="channel.id" v-bind:numSteps = "channel.numSteps"></channel> -->
    </div>
</template>

<script>
import Channel from './channel.vue';

export default {
name: "principal-table",
data() {
    return {
      channelList: [],
    }
},
components: {
    Channel,
},
computed: {
    instrumentList () {
      return this.$store.state.instrumentList;
    },
},
watch: {
    instrumentList: {
        deep: true,
        handler: 'updateChannel',
     }
},

created() {
    this.createChannel();
},

methods: { 
    createChannel: function(){
        this.instrumentList.forEach(element => this.channelList.push({id: element.id , numSteps: element.steps}));
    },

    updateChannel: function() {
        this.channelList = [];
        this.instrumentList.forEach(element => this.channelList.push({id: element.id , numSteps: element.steps}));
    }
}   
}
</script>