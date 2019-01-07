import webAudioManager from './webAudioManager.js';
import AudioPlayerUI from './audioPlayerUI.js';

class AudioUIManager {
  constructor() {
      console.log("AudioUIManager erstellt");

      // Create empty array for all audio player
      this.audioPlayersUI = [];
  }


  setCrossfader(element) {
    element.onchange = this.crossfade.bind(this);
  }

  crossfade(event) {
    //console.log(event.target.value);
    webAudioManager.crossfade(event.target.value);
    this.updateUI();
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
