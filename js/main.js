import webAudioManager from './webAudioManager.js';
import AudioPlayer from './audioPlayer.js';
import audioUIManager from './audioUIManager.js'


let audioPlayer1 = new AudioPlayer("../media/Freischuetz.wav");
let audioPlayer2 = new AudioPlayer("../media/Guitar-Song.mp3");


/*
document.getElementById("playBtn1").onclick = audioPlayer1.onTogglePlay.bind(audioPlayer1);
document.getElementById("volumeRange1").onchange = audioPlayer1.onVolumeChange.bind(audioPlayer1);
document.getElementById("playBtn2").onclick = audioPlayer2.onTogglePlay.bind(audioPlayer2);
document.getElementById("volumeRange2").onchange = audioPlayer2.onVolumeChange.bind(audioPlayer2);
*/

setCanvasSize();
audioUIManager.registerAudioPlayer(audioPlayer1, document.getElementById("playBtn1"), document.getElementById("volumeRange1"), document.getElementById("visualCanvas1"));
audioUIManager.registerAudioPlayer(audioPlayer2, document.getElementById("playBtn2"), document.getElementById("volumeRange2"),  document.getElementById("visualCanvas2"));

audioUIManager.setCrossfader(document.getElementById("crossfaderRange"));


// Eventmanager
window.requestAnimationFrame(audioUIManager.visualBars.bind(audioUIManager));
window.onresize = setCanvasSize;


// Functions
function setCanvasSize() {
  var padding = 15;
  var visCanvas1 = document.querySelector("#visualCanvas1");
  var visCanvas2 = document.querySelector("#visualCanvas2");
  visCanvas1.width = visCanvas1.parentElement.offsetWidth - 2 * padding;
  visCanvas2.width = visCanvas2.parentElement.offsetWidth - 2 * padding;
  console.log(visCanvas1);
}
