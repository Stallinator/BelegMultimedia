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
    this.volume = 1.0;
    this.isReady = false;

    this.gainNode = webAudioManager.createGainNode();
    this.gainNode.connect(webAudioManager.getDestination());

    webAudioManager.registerAudioPlayer(this);


    //this.togglePlay.bind(this);
    //this.chang.bind(this);
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
    this.gainNode.gain.value = volume;
  }

  /*
  onVolumeChange(event) {
    this.setVolume(event.target.value);
  }
  */
}

export default AudioPlayer;
