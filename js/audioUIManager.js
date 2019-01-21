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

  registerAudioPlayer(audioPlayer, playBtn, volumeSlider, visualCanvas) {
    console.log("register audio player");
    var playerUI = new AudioPlayerUI(audioPlayer, playBtn, volumeSlider, visualCanvas);
    this.audioPlayersUI.push(playerUI);
  }

  updateUI() {
    for (var i=0; i < this.audioPlayersUI.length; i++) {
      console.log(this.audioPlayersUI[i].volumeSlider.value);
      this.audioPlayersUI[i].volumeSlider.value = this.audioPlayersUI[i].audioPlayer.volume;
    }

  }

  visualize() {

    for (var p = 0; p < this.audioPlayersUI.length; p++) {
      var frequenzdaten = this.audioPlayersUI[p].audioPlayer.getByteFrequencyData();
      var leinwand = this.audioPlayersUI[p].visualCanvas.getContext("2d");
      var leinwand_breite = this.audioPlayersUI[p].visualCanvas.offsetWidth;
      var leinwand_hoehe = this.audioPlayersUI[p].visualCanvas.offsetHeight;
      leinwand.clearRect(0, 0, leinwand_breite, leinwand_hoehe);


      for (var i = 0; i < frequenzdaten.length; i++) {
        var balken_x = Math.round(leinwand_breite / frequenzdaten.length) * i;
        var balken_breite = Math.round(leinwand_breite / frequenzdaten.length) - 1;
        var balken_hoehe = leinwand_hoehe / 100 * Math.round(-frequenzdaten[i] / 255 * 100);
        var farbe_rot = frequenzdaten[i];
        var farbe_gruen = 255 - frequenzdaten[i];
        leinwand.fillStyle = "rgb(" + farbe_rot + ", " + farbe_gruen + ", 0)";
        leinwand.fillRect(balken_x, leinwand_hoehe, balken_breite, balken_hoehe);
      }


    }

  window.requestAnimationFrame(this.visualize.bind(this));


  }

}

export default new AudioUIManager();
