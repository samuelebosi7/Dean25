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
            <div class='stop' title="Stop">
            </div>
        </div>
            
        <div class='volume' title="Volume">
            <input id="duration" type="range" min="0" max="100">
        </div>

        <div id='tempoDisplays'>
            <div class='tempoProp text-crono' title="Time">
                <div type="text" class='crono'>00:00:00</div>
            </div>
            <div class='tempoProp text-bpm'>
                <div @keypress="isNumber($event)" contenteditable="true" class='enter-to-unselect bpm'>120</div> bpm
            </div>
            <div class='tempoProp text-tot-steps'>
                <div class='tot-steps'>0</div> steps
            </div>
        </div>
        <div id='metronomeDisplay'>
            Metronome:<div id='metronome' class='active' ></div>
        </div>
        <!-- <img src="./src/svg/metronome.svg" class='metronome-svg'> -->
        
        <div contenteditable="true" id='songTitle' class="ed-div">New project</div>
    </div>
</template>

<script>
    import Instrument from "./instrument.vue";
    import store from '../app.vue';
    //import { EventBus } from '../app.vue';
    export default {
<<<<<<< HEAD
        name: 'top-bar',
        data() {
            return {
                isPlaying: false,
            }
        },
        computed: {
            instrumentList () {
            return this.$store.state.instrumentList;
            }
        },
        methods: {
            showButtonsDelete: function() {
                // document.querySelectorAll(".on-inst").forEach(function(el){
                //     el.classList.toggle("active");
                // });
                document.querySelectorAll(".on-inst").forEach(function(el){
                    el.classList.toggle("active");
                });
                document.querySelectorAll(".instrument-line").forEach(function(el){
                    el.classList.toggle("onDelete-instrument-line");
                });
                document.querySelectorAll(".channel").forEach(function(el){
                    el.classList.toggle("onDelete-channel");
                });
            },
            
            addInstrument: function (event) {
            var newId = this.getMaxId()+1;
            this.instrumentList.push({ id: newId, title: "Instrument " + newId , shortTitle: "-"/*, color: Math.floor(Math.random()*16777215).toString(16)*/});
            
            },
=======
    name: 'top-bar',

    computed: {
        instrumentList () {
        return this.$store.state.instrumentList;
        },
        
        isPlaying () {
        return this.$store.state.isPlaying;
        },
        
    },
    methods: {
        showButtonsDelete: function() {
            // document.querySelectorAll(".on-inst").forEach(function(el){
            //     el.classList.toggle("active");
            // });
            document.querySelectorAll(".on-inst").forEach(function(el){
                el.classList.toggle("active");
            });
            document.querySelectorAll(".instrument-line").forEach(function(el){
                el.classList.toggle("onDelete-instrument-line");
            });
            document.querySelectorAll(".channel").forEach(function(el){
                el.classList.toggle("onDelete-channel");
            });
        },
        
    addInstrument: function (event) {
      var newId = this.getMaxId()+1;
      this.instrumentList.push({ id: newId, title: "Instrument " + newId , shortTitle: "-"/*, color: Math.floor(Math.random()*16777215).toString(16)*/});
      
    },
    getMaxId: function() {
    //   console.log(this.instrumentList)
    //   console.log(this.channelList)
      if(this.instrumentList.length >0)
        return Math.max.apply(Math, this.instrumentList.map(function(o) { return o.id; }));
      else return -1;
    },
    playButton:  function() {
        this.$store.commit('setIsPlaying', !this.isPlaying);
    },

    stopButton: function() {
        EventBus.$emit('stopSeq' , 1);
    }
>>>>>>> 3f77711537373b00954f2bb46335dd9dc6e53f62

            getMaxId: function() {
            //   console.log(this.instrumentList)
            //   console.log(this.channelList)
            if(this.instrumentList.length >0)
                return Math.max.apply(Math, this.instrumentList.map(function(o) { return o.id; }));
            else return -1;
            },

            playButton:  function() {
                this.isPlaying = !this.isPlaying;
                if(this.isPlaying)
                    EventBus.$emit('playSeq' , 1);
                else EventBus.$emit('stopSeq' , 1);
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
    $(".play-pause").click(function() {
        $(".play-pause").toggleClass("paused");
        return false;
    });
    /*$(".stop").click(function() {
        if(rec==true){
        rec=false;
        alr_play=false;
        }
        return false;
<<<<<<< HEAD
    });
    $('.enter-to-unselect').keydown(function(e) {
=======
    });*/
    $('.ed-div').keydown(function(e) {
>>>>>>> 3f77711537373b00954f2bb46335dd9dc6e53f62
     if(e.which == 13 ) {
        if($(this).text()!='')
            $(this).blur().next().focus();
        return false;
      }
    });
    /*
    //Main volume slider script
    function createHoverState (myobject){
        myobject.hover(function() {
        $(this).prev().toggleClass('hilite');
        });
        myobject.mousedown(function() {
        $(this).prev().addClass('dragging');
        $("*").mouseup(function() {
            $(myobject).prev().removeClass('dragging');
        });
        });
    }
    
    $(".volume").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 0,
        animate: 1300
    });
    $("#main").slider( "value", 100 );
    
    createHoverState($(".volume a.ui-slider-handle"));*/
    });
</script>