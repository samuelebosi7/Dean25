<template>
    <div id='transport-bar'>
        <div id='inst-mod'>
            <div v-on:click="addInstrument"  class="add-rem-inst add-inst">
                <div class="plus-symbol" title="Add Instrument">+</div>
            </div>
            <div v-on:click="showButtonsDelete" class="add-rem-inst rem-inst" title="Remove Instruments">
                <div class="minus-symbol">-</div> 
            </div>
        </div>
        <div id='rep-menu'>
            <div class='play-pause' title="Play/Pause" v-on:click="playButton">
            </div>
            <div class='stop' title="Stop" v-on:click="stopButton">
            </div>
            <div class='rec' title="Record" v-on:click="recButton">
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
            if (evt.keyCode == 32 && !document.querySelector(".play-pause").classList.contains("onDelete-channel")) {   //se schiacchiato spazio, fa il play degli strumenti
                that.playButton();
            } else {
                evt.preventDefault();
            }
        });
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
        showButtonsDelete: function() {
            
            document.querySelectorAll(".on-inst").forEach(function(el){
                el.classList.toggle("active");
            });
            document.querySelectorAll(".instrument-line").forEach(function(el){
                el.classList.toggle("onDelete-instrument-line");
            });

            document.querySelectorAll(".channel, .add-inst, .play-pause, .stop, .rec, #masterVolume, .tempoProp").forEach(function(el){
                el.classList.toggle("onDelete-channel");
            });
            
        },
        
    addInstrument: function (event) {
        $(".sub-menu.genre").removeClass("active");
        var newId = this.getMaxId()+1;
        this.instrumentList.push({ id: newId, title: "Nd" , shortTitle: "-"/*, color: Math.floor(Math.random()*16777215).toString(16)*/});     
        this.$emit('deleteChannel', {id: newId});
        EventBus.$emit('changedSolo', {id: newId, newEl: true, solo: 1});  
    },
    getMaxId: function() {
    //   console.log(this.instrumentList)
    //   console.log(this.channelList)
      if(this.instrumentList.length >0)
        return Math.max.apply(Math, this.instrumentList.map(function(o) { return o.id; }));
      else return -1;
    },

    playButton:  function() {
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
        }

        if(this.isPlaying || (!this.isPlaying && !unselInstCheck))
        {
            $(".play-pause").toggleClass("paused");
            $(".sub-menu.genre").removeClass("active");
            $(".add-rem-inst").toggleClass("onDelete-channel");
            this.isPlaying = !this.isPlaying;
            EventBus.$emit('playSeq' , {isPlaying: this.isPlaying , isStop: false});
        }
    },
    
    stopButton: function() {
        this.isPlaying = false;
        $(".play-pause").removeClass("paused");
        $(".sub-menu.genre").removeClass("active");
        $(".add-rem-inst").removeClass("onDelete-channel");
        EventBus.$emit('stopSeq' , {isPlaying: false , isStop: true, });
    },

    recButton: function() {
        this.isRecording=!this.isRecording;
        $(".play-pause").removeClass("paused");
        $(".sub-menu.genre").removeClass("active");
        $(".add-rem-inst").removeClass("onDelete-channel");

        $(".rec-time-left").toggleClass("active");
        // EventBus.$emit('stopSeq' , {isPlaying: false , isStop: true, });
        // EventBus.$emit('recSeq' , {});
        // EventBus.$emit('playSeq' , {isPlaying: true , isStop: false});
        if(this.isRecording){
            var countDownDate = new Date("Oct 3, 2020 19:03:00").getTime();
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
                }
            }, 1000);
        }
        else
        {
            clearTimeout(this.recTimeOut);
            $('.rec').removeClass("rec-active");
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
    //Play-Pause-Record script
    // $(".play-pause").click(function() {
    //     $(".play-pause").toggleClass("paused");
    //     return false;
    // });

    /*$(".stop").click(function() {
        if(rec==true){
        rec=false;
        alr_play=false;
        }
        return false;
    });*/
    $('.enter-to-unselect').keydown(function(e) {
     if(e.which == 13 ) {
        if($(this).val()!='')
            $(this).blur().next().focus();
        return false;
      }
    });
    
    // //Main volume slider script
    // function createHoverState (myobject){
    //     myobject.hover(function() {
    //     $(this).prev().toggleClass('hilite');
    //     });
    //     myobject.mousedown(function() {
    //     $(this).prev().addClass('dragging');
    //     $("*").mouseup(function() {
    //         $(myobject).prev().removeClass('dragging');
    //     });
    //     });
    // }
    
    // $("#volume").slider({
    //     orientation: "horizontal",
    //     range: "min",
    //     max: 100,
    //     value: 0,
    //     animate: 1300
    // });
    // $("#main").slider( "value", 100 );
    
    // createHoverState($(".volume a.ui-slider-handle"));
    });
</script>