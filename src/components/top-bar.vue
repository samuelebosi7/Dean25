<template>
    <div id='transport-bar'>
        <div id='inst-mod'>
            <div class="add-rem-inst add-inst">
                <div class="plus-symbol">+</div> 
            </div>
            <div class="add-rem-inst rem-inst">
                <div class="minus-symbol">-</div> 
            </div>
        </div>
        <div id='rep-menu'>
            <div class='play-pause'>
            </div>
            <div class='stop'>
            </div>
        </div>
            
        <div class='volume'>
            <input id="duration" type="range" min="0" max="100">
        </div>

        <div id='tempoDisplays'>
            <div class='tempoProp text-crono'>
                <div type="text" class='crono'>00:00:00</div>
            </div>
            <div class='tempoProp text-bpm'>
                <div contenteditable="true" class='ed-div bpm'>120</div> bpm
            </div>
            <div class='tempoProp text-tot-steps'>
                <div class='tot-steps'>0</div> steps
            </div>
        </div>
        <div id='metronomeDisplay'>
            Metronome:<div id='metronome' class='active' ></div>
        </div>
        
        <div contenteditable="true" id='songTitle' class="ed-div">New project</div>
    </div>
</template>

<script>
    export default {
    name: 'top-bar',
    }
    
    $(document).ready(function() {
    //Play-Pause-Record script
    $(".play-pause").click(function() {
        $(".play-pause").toggleClass("paused");
        return false;
    });
    $(".stop").click(function() {
        if(rec==true){
        rec=false;
        alr_play=false;
        }
        return false;
    });
    $('.ed-div').keydown(function(e) {
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