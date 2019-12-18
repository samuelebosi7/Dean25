<template>
   <div id= "principal-table">
        <channel v-for="channel in channelList" v-bind:key="channel.id"></channel>
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
    instrumentList: function () {
        this.updateChannel()
    }
},
created() {
    this.createChannel();
},

methods: { 
    createChannel: function(){
        this.instrumentList.forEach(element => this.channelList.push({id: element.id , title: element.title}));
    },

    updateChannel: function() {
        this.channelList = [];
        this.instrumentList.forEach(element => this.channelList.push({id: element.id , title: element.title}));
    }
}   
}
</script>