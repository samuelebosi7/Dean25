<template>
    <div id='transport-bar'>
        <div class='text-songTitle'>
            <span contenteditable="true" id='songTitle' >New project</span>
        </div>
        <div id='rep-menu'>
            <div class='play-pause'>
            </div>
            <div class='rec'>
            </div>
            <div class='stop'>
            </div>
        </div>
            
        <div id='tempoDisplays'>
            <div class='tempoProp text-crono'>
                <span type="text" class='crono'>00:00:00</span>
            </div>
            <div class='tempoProp text-bpm'>
                <input type="text" class='bpm' min="40" max="240" value='120'></input>bpm
            </div>
        </div>
            <div class='volume'>
                <input id="duration" type="range" min="0" max="100"></input>
            </div>
    </div>
</template>

<script>
export default {
  name: 'top-bar',
}
</script>