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

    // Create empty array for AudioNodes
    this.audioNodes = [];

    this.track = webAudioManager.createMediaElementSource(audioElement);
    this.gainNode = webAudioManager.createGainNode();
    this.analyserNode = webAudioManager.createAnalyserNode();

    this.biquadFilter = webAudioManager.createBiquadFilterNode();
    this.biquadFilter.type = 'lowpass';
    this.biquadFilter.frequency.value = 10000;

    this.audioNodes.push(this.track);
    this.audioNodes.push(this.gainNode);

    this.isPlaying = false;
    this.hasBiquadFilter = false;
    this.crossfadeGain = 0.71;
    //this.volume = 0.5;
    this.setVolume(0.7);
    this.isReady = false;

    this.connectNodes();
    //this.activateLowPassFilter();
    webAudioManager.registerAudioPlayer(this);


    this.setCrossfadeGain.bind(this);
    this.setVolume.bind(this);
  }

  connectNodes() {
    for (var i = 0; i < this.audioNodes.length-1; i++) {
      this.audioNodes[i].connect(this.audioNodes[i+1]);
    }

    this.audioNodes[this.audioNodes.length-1].connect(this.analyserNode);
    this.analyserNode.connect(webAudioManager.getDestination());
  }

  disconnectNodes() {
    // disconnect
    for (var i = 0; i < this.audioNodes.length; i++) {
      this.audioNodes[i].disconnect();
    }
    this.analyserNode.disconnect();
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
    this.gainNode.gain.value = this.volume * this.crossfadeGain;
  }

  setFilterFrequency(frequency) {
    this.biquadFilter.frequency.value = frequency;
  }

  setCrossfadeGain(gain) {
    this.crossfadeGain = gain;
    this.gainNode.gain.value = this.volume * this.crossfadeGain;
  }

  toggleLowPassFilter() {
    if (this.hasBiquadFilter == false) {
      this.disconnectNodes();
      this.audioNodes.push(this.biquadFilter);
      this.hasBiquadFilter = true;
    } else {
      this.disconnectNodes();
      this.audioNodes.pop();
      this.hasBiquadFilter = false;
    }

    this.connectNodes();
  }

}

export default HtmlAudioPlayer;
