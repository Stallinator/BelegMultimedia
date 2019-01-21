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

audioUIManager.registerAudioPlayer(audioPlayer1, document.getElementById("playBtn1"), document.getElementById("volumeRange1"), document.getElementById("visualCanvas1"));
audioUIManager.registerAudioPlayer(audioPlayer2, document.getElementById("playBtn2"), document.getElementById("volumeRange2"),  document.getElementById("visualCanvas2"));

audioUIManager.setCrossfader(document.getElementById("crossfaderRange"));



window.requestAnimationFrame(audioUIManager.visualize.bind(audioUIManager));

/*
volumeRange1.oninput = () => {
    console.log(volumeRange1.value);
};
*/
