import webAudioManager from './webAudioManager.js';

class AudioPlayer {
  constructor(url) {
    if (!url) {
      alert("No URL specified!");
      return;
    }
    this.request = new XMLHttpRequest();
    this.request.open('GET', url, true);
    console.log("Load Audio " + url);
    this.request.responseType = 'arraybuffer';

    this.request.onload = this.receiveAudioData.bind(this);
    this.request.send();

    this.isPlaying = false;
    this.volume = 0.5;
    this.crossfadeGain = 0.71;
    this.isReady = false;

    this.gainNode = webAudioManager.createGainNode();
    this.analyserNode = webAudioManager.createAnalyserNode();

    this.gainNode.connect(this.analyserNode);
    this.analyserNode.connect(webAudioManager.getDestination());

    webAudioManager.registerAudioPlayer(this);
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

  receiveAudioData() {
      let audioData = this.request.response;
      webAudioManager.decodeAudioData(audioData).then(
        this.setBuffer.bind(this)
      );
  }

  setBuffer(buffer) {
    this.buffer = buffer;
    this.isReady = true;
  }

  togglePlay() {
    if (!this.isReady) return;

    if (this.isPlaying) {
      this.bufferSource.stop();
    } else {
      // Buffer Sources are one-time use objects
      // and need to be re-instantiated for every start-call
      this.bufferSource = webAudioManager.createBufferSource();
      this.bufferSource.buffer = this.buffer;
      this.bufferSource.connect(this.gainNode);
      this.bufferSource.start();
    }
    this.isPlaying = !this.isPlaying;
  }

  setVolume(volume) {
    this.volume = volume;
    console.log("Volume: " + this.volume);
    this.gainNode.gain.value = this.volume * this.crossfadeGain;
  }

  setCrossfadeGain(gain) {
    this.crossfadeGain = gain;
    console.log("crossfade Gain: " + this.crossfadeGain);
    this.gainNode.gain.value = this.volume * this.crossfadeGain;
  }

  /*
  onVolumeChange(event) {
    this.setVolume(event.target.value);
  }
  */
}

export default AudioPlayer;
