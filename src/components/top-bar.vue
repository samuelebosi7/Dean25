<template>
    <div id='transport-bar'>
        <div id='inst-mod'>
            <div v-on:click="addInstrument"  class="add-rem-inst add-inst">
                <div class="plus-symbol" title="Add Instrument">+</div>
            </div>
            <div v-on:click="showButtonsDelete" class="add-rem-inst rem-inst inactive" title="Remove Instruments">
                <div class="minus-symbol">-</div> 
            </div>
        </div>
        <div id='rep-menu'>
            <div class='play-pause inactive' title="Play/Pause" v-on:click="playButton">
            </div>
            <div class='stop inactive' title="Stop" v-on:click="stopButton">
            </div>
            <div class='rec inactive' title="Record" v-on:click="recButton">
            </div>
            <div class='rec-time-left'>
                <div class='speech-bubble'>
                    <span class="rec-time-left-text">
                        Time left: 12:01
                    </span>
                </div>
            </div>
        </div>
            
        <div id='masterVolume' title="Volume">
            <!-- <input id="duration" type="range" min="0" max="100"> -->
            <slider v-on:changeVolume="changeVolume"></slider>
            <!-- <h1>{{ value }}</h1> -->
        </div>

        <div id='tempoDisplays'>
            <!-- <div class='tempoProp text-crono' title="Time">
                <div type="text" class='crono'>00:00:00</div>
            </div> -->
            
            <div class='tempoProp text-bpm'>
                <div class='bpm-selector'>
                    <div v-on:click="bpmButtChange(0.1)" class='bpm-selectorButt bpm-selectorButt-up'>˄</div>
                    <div v-on:click="bpmButtChange(-0.1)" class='bpm-selectorButt bpm-selectorButt-down'>˅</div>
                </div>
                <input v-on:change="bpmChange" @keypress="isNumber($event)" class='enter-to-unselect bpm' value="120"> bpm
            </div>
            <!-- <div class='tempoProp text-tot-steps'>
                <div class='tot-steps'>0</div> steps
            </div> -->
        </div>
        <!-- <div id='metronomeDisplay'>
            Metronome:<div id='metronome' class='active' ></div>
        </div> -->
        <!-- <img src="./src/svg/metronome.svg" class='metronome-svg'> -->
        <div id="projectMenuContainer">
            <input id='projectTitle' class="enter-to-unselect" value="New project">
            <!-- <span id="openProjectMenu" v-on:click="projectMenu">&blacktriangledown;</span> -->

            <div class="icon nav-icon-2" v-on:click="projectMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div id="projectMenu">
                <ul class="sub-menu-project">
                    <li class="sub-menu-project-elements">
                        Save
                    </li>
                    <li class="sub-menu-project-elements">
                        Export MIDI
                    </li>
                    <li class="sub-menu-project-elements">
                        <label class="switch">
                            <input id="freeMode" type="checkbox" v-on:click="changeFreeMode">
                            <span class="slider round"></span>
                        </label>
                        Free Mode
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Instrument from "./instrument.vue";
    import Slider from "./slider.vue";
    import store from '../app.vue';
    import { EventBus } from '../app.vue';

    export default {
    name: 'top-bar',
    data() {
        return {
            isPlaying: false,
            isRecording: false,
            isInstListEmpty: true,
            recTimeOut: {},
        }
    },
    computed: {
        instrumentList () {
        return this.$store.state.instrumentList;
        },
    },
        
    components: {
        Slider
    },
    created: function () {
        let that = this;
        document.addEventListener('keyup', function (evt) {
            if (evt.keyCode == 32 && !document.querySelector(".play-pause").classList.contains("inactive")) {   //se schiacchiato spazio, fa il play degli strumenti
                that.playButton();
            } else {
                evt.preventDefault();
            }
        });

        EventBus.$on('emptyList', this.emptyList);
    },
    // mounted() {
    //     $(function(){
    //         if ($('#volume').length) {
    //             console.log("ciao");
    //             $("#volume").slider({
    //                 orientation: "horizontal",
    //                 range: "min",
    //                 max: 100,
    //                 value: 0,
    //                 animate: 1300
    //             });
    //         }
    //     })
    // },
    methods: {
    emptyList: function(value){
        this.isInstListEmpty=value.state;
        $(".rem-inst, .play-pause, .stop, .rec").addClass("inactive");
        $(".add-inst, #masterVolume, .tempoProp").removeClass("inactive");
    },

    showButtonsDelete: function() {
        $(".on-inst").toggleClass("active");
        $(".instrument-line").toggleClass("onDelete-instrument-line");
        $(".channel, .add-inst, .play-pause, .stop, .rec, #masterVolume, .tempoProp").toggleClass("inactive");
    },
        
    addInstrument: function (event) {
        $(".sub-menu.genre").removeClass("active");
        var newId = this.getMaxId()+1;
        this.instrumentList.push({ id: newId, title: "Nd" , shortTitle: "-"/*, color: Math.floor(Math.random()*16777215).toString(16)*/});     
        if(this.isInstListEmpty)
        {    
            this.isInstListEmpty=false;
            $(".rem-inst, .play-pause, .stop, .rec").removeClass("inactive");
        }
        this.$emit('deleteChannel', {id: newId});
        //EventBus.$emit('changedSolo', {id: newId, newEl: true, solo: 1});  
    },
    getMaxId: function() {
    //   console.log(this.instrumentList)
    //   console.log(this.channelList)
      if(this.instrumentList.length >0)
        return Math.max.apply(Math, this.instrumentList.map(function(o) { return o.id; }));
      else return -1;
    },

    playCheck:  function() {
        var passedControl=true;
        if(!this.isPlaying)
        {
            var unselInstCheck=false;
            this.instrumentList.forEach(inst => {
                if(($('#actualSample'+inst.id).text().trim()=="Nd") && (unselInstCheck==false))
                {  
                    unselInstCheck=true;
                    alert("One or more instruments are not selected!");
                }
            });
            if(unselInstCheck)
                passedControl=false;
        }
        return passedControl;
    },

    playButton: function(){
        if(this.playCheck())
        {   
            this.isPlaying = !this.isPlaying;
            $(".play-pause").toggleClass("paused");
            $(".sub-menu.genre").removeClass("active");
            $(".add-rem-inst").toggleClass("inactive");
            EventBus.$emit('playSeq' , {isPlaying: this.isPlaying , isStop: false});
        }
    },
    
    stopButton: function() {
        this.isPlaying = false;
        $(".play-pause").removeClass("paused");
        $(".sub-menu.genre").removeClass("active");
        $(".add-rem-inst").removeClass("inactive");
        EventBus.$emit('stopSeq' , {isPlaying: false , isStop: true, });
    },

    recButton: function() {
        if(this.playCheck())
        {
            this.isRecording=!this.isRecording;
            $(".play-pause").addClass("paused");
            $(".sub-menu.genre").removeClass("active");
            $(".add-rem-inst").removeClass("inactive");

            $(".instrument, .channel, .add-inst, .rem-inst, .play-pause, .stop, #masterVolume, .tempoProp").addClass("inactive");

            $(".rec-time-left").toggleClass("active");
            EventBus.$emit('stopSeq' , {isPlaying: false , isStop: true, });
            //EventBus.$emit('recSeq' , {});
            EventBus.$emit('playSeq' , {isPlaying: true , isStop: false});
            if(this.isRecording){
                var countDownDate = new Date("Oct 24, 2020 19:03:00").getTime();
                this.recTimeOut = setInterval(function() {
                    $('.rec').toggleClass("rec-active");

                    var now = new Date().getTime();

                    // Find the distance between now and the count down date
                    var distance = countDownDate - now;

                    // Time calculations for days, hours, minutes and seconds
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    // Display the result in the element with id="demo"
                    $(".rec-time-left-text").text("Time left: "+minutes+":"+seconds);
                    
                    // If the count down is finished, write some text
                    if (distance < 0) {
                        clearInterval(this.recTimeOut);
                        this.isRecording=false;
                        $('.rec').removeClass("rec-active");
                        $(".rec-time-left").removeClass("active");
                        $(".instrument, .channel, .add-inst, .rem-inst, .play-pause, .stop, #masterVolume, .tempoProp").removeClass("inactive");
                    }
                }, 1000);
            }
            else
            {
                clearTimeout(this.recTimeOut);
                $(".play-pause").removeClass("paused");
                EventBus.$emit('stopSeq' , {isPlaying: false , isStop: true});
                $('.rec').removeClass("rec-active");
                $(".instrument, .channel, .add-inst, .rem-inst, .play-pause, .stop, #masterVolume, .tempoProp").removeClass("inactive");
            }
        }
    },

    changeVolume: function(value){
        $(".sub-menu.genre").removeClass("active");
        this.$emit('changeVolume', {volume: value.volume});
    },

    bpmChange: function(e) {
        $(".sub-menu.genre").removeClass("active");
        EventBus.$emit('changeBpm' , {newBpm: e.target.value});
        //console.log(e.target.value);
    },

    bpmButtChange: function(val){
        $(".sub-menu.genre").removeClass("active");
        var actual=parseFloat($(".bpm").val());
        actual=(actual+val).toFixed(1);
        $(".bpm").val(actual);
        EventBus.$emit('changeBpm' , {newBpm: actual});
    },

    projectMenu: function(){
        $(".icon").toggleClass("open");
        $("#projectMenu").toggleClass("active");
        //$("#openProjectMenu").toggleClass("rotated");
    },

    changeFreeMode: function(){
        this.$store.commit("setFreeMode");
    },

    getMaxId: function() {
        //  console.log(this.instrumentList)
        //   console.log(this.channelList)
        if(this.instrumentList.length >0)
            return Math.max.apply(Math, this.instrumentList.map(function(o) { return o.id; }));
        else return -1;
    },

    isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();;
        } else {
            return true;
        }
    }

    }
    }
    
    $(document).ready(function() {
        $('.enter-to-unselect').keydown(function(e) {
        if(e.which == 13 ) {
            if($(this).val()!='')
                $(this).blur().next().focus();
            return false;
        }
        });
    });
</script>