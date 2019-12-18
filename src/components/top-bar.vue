<template>
    <div id='transport-bar'>
        <div class='text-songTitle'>
            <span contenteditable="true" id='songTitle' >New project</span>
        </div>
        <div id='rep-menu'>
            <div class='play-pause'>
            </div>
            <div class='stop'>
            </div>
        </div>
            
        <div id='tempoDisplays'>
            <div class='tempoProp text-crono'>
                <div type="text" class='crono'>00:00:00</div>
            </div>
            <div class='tempoProp text-bpm'>
                <input type="text" class='bpm' min="40" max="240" value='120'>bpm
            </div>
            <div class='tempoProp text-steps'>
                <div class='steps'>0</div> steps
            </div>
        </div>
        <div class='volume'>
            <input id="duration" type="range" min="0" max="100">
        </div>
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