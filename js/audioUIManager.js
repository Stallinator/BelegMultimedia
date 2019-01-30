import webAudioManager from './webAudioManager.js';
import AudioPlayerUI from './audioPlayerUI.js';

class AudioUIManager {
  constructor() {
      console.log("AudioUIManager erstellt");

      // Create empty array for all audio player
      this.audioPlayersUI = [];
      //this.visFunction = visAudio;
  }

  setCrossfader(element) {
    element.onchange = this.crossfade.bind(this);
  }

  crossfade(event) {
    //console.log(event.target.value);
    webAudioManager.crossfade(event.target.value);
    //this.updateUI();
  }

  registerAudioPlayer(audioPlayer, playBtn, volumeSlider, visualCanvas, progressBar) {
    console.log("register audio player");
    var playerUI = new AudioPlayerUI(audioPlayer, playBtn, volumeSlider, visualCanvas, progressBar);
    this.audioPlayersUI.push(playerUI);
  }

  updateUI() {
    for (var i=0; i < this.audioPlayersUI.length; i++) {
      console.log(this.audioPlayersUI[i].volumeSlider.value);
      this.audioPlayersUI[i].volumeSlider.value = this.audioPlayersUI[i].audioPlayer.volume;
    }

  }


  visualBars() {
    for (var p = 0; p < this.audioPlayersUI.length; p++) {
      //for (var p = 0; p < 1; p++) {
      var canvas = this.audioPlayersUI[p].visualCanvas;
      var canvasCtx = canvas.getContext("2d");
      var canvasWidth = canvas.offsetWidth;
      var canvasHeight = canvas.offsetHeight;
      canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      canvasCtx.fillStyle = "#008000";

      var colorString = ["#00a000", "#008000", "#f0a000", "#cc4000", "#FF0000"];

      var frequencyData = this.audioPlayersUI[p].audioPlayer.getByteFrequencyData();
      var barWidth = Math.round(canvasWidth / frequencyData.length) - 1;
      //var barWidth = canvasWidth / frequencyData.length;
      //console.log(barWidth);
      for (var i = 0; i < frequencyData.length; i++) {
          //console.log ("f: " + frequencyData[i]);
          var x = i * Math.round(canvasWidth / frequencyData.length);
          //var y = Math.round(frequencyData[i] / 255 * canvasHeight);

          var y = frequencyData[i] / 255;
          var red = 0;
          var green = 255;

          for (var seg = 0; seg < 5 && y >= 0; seg++) {
            canvasCtx.fillStyle = colorString[seg];
            if (y < 0.2) {
              canvasCtx.fillRect(x, canvasHeight - Math.round(0.2 * seg * canvasHeight), barWidth, -1 * Math.round(y * canvasHeight));
            } else {
              canvasCtx.fillRect(x, canvasHeight - Math.round(0.2 * seg * canvasHeight), barWidth, -1 * Math.round(0.2 * canvasHeight));
            }
            y = y - 0.2;
          }
          //canvasCtx.fillRect(x, canvasHeight, barWidth, -1 * y);

      }
      //canvasCtx.fillRect(21, canvasHeight, 20, -150);


    }
    window.requestAnimationFrame(this.visualBars.bind(this));
    //window.setTimeout(this.visualBars.bind(this), 4000);
  }


}

export default new AudioUIManager();
