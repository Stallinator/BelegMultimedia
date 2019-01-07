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
//document.getElementById("crossfaderRange").onchange = webAudioManager.crossfade.bind(webAudioManager);

audioUIManager.registerAudioPlayer(audioPlayer1, document.getElementById("playBtn1"), document.getElementById("volumeRange1"));
audioUIManager.registerAudioPlayer(audioPlayer2, document.getElementById("playBtn2"), document.getElementById("volumeRange2"));

audioUIManager.setCrossfader(document.getElementById("crossfaderRange"));

/*
var crossfaderRange = document.getElementById("crossfaderRange");
var volumeRange1 = document.getElementById("volumeRange1");
//$('#default').puiinputtextarea();

crossfaderRange.onchange = function() {
  console.log(crossfaderRange.value);
  webAudioManager.crossfadeX(crossfaderRange.value);
};

volumeRange1.oninput = () => {
    console.log(volumeRange1.value);
};
*/
