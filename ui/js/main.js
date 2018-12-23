import webAudioManager from './webAudioManager.js';
import AudioPlayer from './audioPlayer.js';


let audioPlayer1 = new AudioPlayer("../media/Freischuetz.wav");
let audioPlayer2 = new AudioPlayer("../media/basic_beat.wav");


document.getElementById("playBtn1").onclick = audioPlayer1.onTogglePlay.bind(audioPlayer1);
document.getElementById("volumeRange1").onchange = audioPlayer1.onVolumeChange.bind(audioPlayer1);
document.getElementById("playBtn2").onclick = audioPlayer1.onTogglePlay.bind(audioPlayer2);
document.getElementById("volumeRange2").onchange = audioPlayer1.onVolumeChange.bind(audioPlayer2);



var volumeRange1 = document.getElementById("volumeRange1");
$('#default').puiinputtextarea();

volumeRange1.oninput = () => {
    console.log(volumeRange1.value);
};
