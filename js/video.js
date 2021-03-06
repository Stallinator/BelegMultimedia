import VideoPlayer from './videoPlayer.js';

let canvas1 = document.getElementById('c1');
let canvas2 = document.getElementById('c2');
let canvas3 = document.getElementById('c3');
let canvas4 = document.getElementById('c4');

let pbSpeed1 = document.getElementById('pbspeed1');
let pbSpeed2 = document.getElementById('pbspeed2');

let audioLink = document.getElementById("audioLink");

// position the audio-link below the last canvas
window.addEventListener('resize', function () {
    audioLink.style.top = canvas4.height + 'px';
    // maximizing or minimizing the window takes some time so we wait and resize again
    setTimeout(function () {
        audioLink.style.top = canvas4.height + 'px';
    }, 150);
}.bind(this), false);

const videoElement1 = document.querySelector('#videoplayer1');
let videoplayer1 = new VideoPlayer("../media/sintel.mpd", videoElement1, true, canvas1, canvas4, pbSpeed1, function (r, g, b) { return (r + g + b) / 3 < 10 });
const videoElement2 = document.querySelector('#videoplayer2');
let videoplayer2 = new VideoPlayer("../media/videoChroma.mpd", videoElement2, true, canvas2, canvas3, pbSpeed2, function (r, g, b) { return g > r + 7; });

audioLink.style.top = canvas4.height + 'px';