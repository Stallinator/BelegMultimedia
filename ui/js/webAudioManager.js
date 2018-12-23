class WebAudioManager {

    constructor() {
      if (!window.AudioContext || window.webkitAudioContext) {
          alert("Web Audio API is not supported in this browser!")
          return;
      }

      this.audioContext = new (window.AudioContext||window.webkitAudioContext)();

      // Create empty array for all audio player
      this.audioPlayers = [];

      // Bind example
      //navigator.requestMIDIAccess().then(this.onMidiSuccess.bind(this));
    }

    createBufferSource() {
      return this.audioContext.createBufferSource();
    }

    createGainNode() {
      return this.audioContext.createGain();
    }

    decodeAudioData(data) {
      return this.audioContext.decodeAudioData(data);
    }

    getDestination() {
      return this.audioContext.destination;
    }

    registerAudioPlayer(audioPlayer) {
      this.audioPlayers.push(audioPlayer);
    }
}

// Pattern: Singleton
export default new WebAudioManager();
