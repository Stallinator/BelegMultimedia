import webAudioManager from './webAudioManager.js';

class HtmlAudioPlayer {
  constructor(url, audioElement, dash) {

    if (!url) {
      alert("No URL specified!");
      return;
    }
    this.audioElement = audioElement;

    if (dash == true) {
      var player = dashjs.MediaPlayer().create();
      player.initialize(audioElement, url, false);
    } else {
      this.audioElement.src = url;
    }


    this.track = webAudioManager.createMediaElementSource(audioElement);
    this.gainNode = webAudioManager.createGainNode();
    this.analyserNode = webAudioManager.createAnalyserNode();

    this.isPlaying = false;
    this.crossfadeGain = 0.71;
    this.volume = this.setVolume(0.5);
    this.isReady = false;

    // Connecting
    this.track.connect(this.gainNode);
    this.gainNode.connect(this.analyserNode);
    this.analyserNode.connect(webAudioManager.getDestination());

    webAudioManager.registerAudioPlayer(this);


    //this.togglePlay.bind(this);
    //this.chang.bind(this);
  }

  play() {
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }

  getByteFrequencyData() {
    this.analyserNode.fftSize = 64;
    var frequencyData = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(frequencyData);
    this.analyserNode.smoothingTimeConstant = 0.7;

    return frequencyData;
  }

  visualize() {
    AudioUIManager.draw(this.analyser.getByteFrequencyData(frequenzdaten));

  }

  setVolume(volume) {
    this.volume = volume;
    console.log("Volume: " + this.volume);
    this.gainNode.gain.value = this.volume * this.crossfadeGain;
    console.log("GesamtVolume: " + this.gainNode.gain.value);
  }

  setCrossfadeGain(gain) {
    this.crossfadeGain = gain;
    console.log("crossfade Gain: " + this.crossfadeGain);
    this.gainNode.gain.value = this.volume * this.crossfadeGain;
  }

}

export default HtmlAudioPlayer;
