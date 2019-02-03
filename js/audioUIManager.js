import webAudioManager from './webAudioManager.js';
import AudioPlayerUI from './audioPlayerUI.js';

class AudioUIManager {

  KS_PRESSED = 148;

  KI_CROSSFADE_SLIDER = 64;
  KI_TOGGLE_PLAY_1 = 16;
  KI_TOGGLE_PLAY_2 = 17;
  KI_TOGGLE_LOW_PASS_1 = 50;
  KI_TOGGLE_LOW_PASS_2 = 51;

  constructor() {
      // Create empty array for all audio player
      this.audioPlayersUI = [];
      this.crossfadeValue = 0.5;

      window.addEventListener('midi', function (e) {
        console.log(e.detail.data);
        if(e.detail.data[1] == this.KI_CROSSFADE_SLIDER) {
          let valueIn = e.detail.data[2] / 127;
          this.crossfadeValue = valueIn;
          webAudioManager.crossfade(valueIn);
          this.updateUI();
        } else if(e.detail.data[0] != this.KS_PRESSED && e.detail.data[1] == this.KI_TOGGLE_LOW_PASS_1) {
          this.audioPlayersUI[0].effect1Slider.value = e.detail.data[2] * (100 / 127) * 200;
        } else if(e.detail.data[0] != this.KS_PRESSED && e.detail.data[1] == this.KI_TOGGLE_LOW_PASS_2) {
          this.audioPlayersUI[1].effect1Slider.value = e.detail.data[2] * (100 / 127) * 200;
        } else if (e.detail.data[0] == this.KS_PRESSED) {
          switch(e.detail.data[1]) {
            case this.KI_TOGGLE_PLAY_1:
              this.audioPlayersUI[0].play();
              break;
            case this.KI_TOGGLE_PLAY_2:
              this.audioPlayersUI[1].play();
              break;
            case this.KI_TOGGLE_LOW_PASS_1:
              this.audioPlayersUI[0].toggleEffect1();
              this.audioPlayersUI[0].effect1Btn.checked = !this.audioPlayersUI[0].effect1Btn.checked;
              break;
            case this.KI_TOGGLE_LOW_PASS_2:
              this.audioPlayersUI[1].toggleEffect1();
              this.audioPlayersUI[1].effect1Btn.checked = !this.audioPlayersUI[1].effect1Btn.checked;
              break;
            default:
              break;
          }
        }
      }.bind(this));
  }

  setCrossfader(element) {
    this.crossfader = element;
    element.onchange = this.crossfade.bind(this);
  }

  crossfade(event) {
    this.crossfadeValue = event.target.value;
    webAudioManager.crossfade(event.target.value);
  }

  registerAudioPlayer(audioPlayer, playBtn, volumeSlider, visualCanvas, progressBar, durationField, currTimeField, effect1Btn, effect1Slider) {
    var playerUI = new AudioPlayerUI(audioPlayer, playBtn, volumeSlider, visualCanvas, progressBar,
      durationField, currTimeField, effect1Btn, effect1Slider);
    this.audioPlayersUI.push(playerUI);
  }

  updateUI() {
    for (var i=0; i < this.audioPlayersUI.length; i++) {
      this.audioPlayersUI[i].volumeSlider.value = this.audioPlayersUI[i].audioPlayer.volume;
      this.crossfader.value = this.crossfadeValue;
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
