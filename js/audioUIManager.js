import webAudioManager from './webAudioManager.js';
import AudioPlayerUI from './audioPlayerUI.js';

class AudioUIManager {
  constructor() {
      console.log("AudioUIManager erstellt");

      // Create empty array for all audio player
      this.audioPlayersUI = [];
  }

  draw(freguenzdaten) { //https://www.drweb.de/html5-und-die-web-audio-api-teil-2-wir-erstellen-ein-visuelles-audiospektrum-per-canvas-48675/
  var leinwand = document.getElementsByTagName("canvas")[0].getContext("2d");
  var leinwand_breite = document.getElementsByTagName("canvas")[0].offsetWidth;
  var leinwand_hoehe = document.getElementsByTagName("canvas")[0].offsetHeight;
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

window.requestAnimationFrame(audiospektrum);
  }

  setCrossfader(element) {
    element.onchange = this.crossfade.bind(this);
  }

  crossfade(event) {
    //console.log(event.target.value);
    webAudioManager.crossfade(event.target.value);
    //this.updateUI();
  }

  registerAudioPlayer(audioPlayer, playBtn, volumeSlider) {
    console.log("register audio player");
    var playerUI = new AudioPlayerUI(audioPlayer, playBtn, volumeSlider);
    this.audioPlayersUI.push(playerUI);
  }

  updateUI() {
    for (var i=0; i < this.audioPlayersUI.length; i++) {
      console.log(this.audioPlayersUI[i].volumeSlider.value);
      this.audioPlayersUI[i].volumeSlider.value = this.audioPlayersUI[i].audioPlayer.volume;
    }

  }

}

export default new AudioUIManager();
