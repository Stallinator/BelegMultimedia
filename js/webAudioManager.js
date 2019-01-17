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


    createAnalyserNode() {
      return this.audioContext.createAnalyser();
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


    // Fades between 0 (all source 1) and 1 (all source 2)
    crossfade(x) {
      //console.log("x " + x);
      //console.log(event.target.value);
      // Use an equal-power crossfading curve:
      var gain1 = Math.cos(x * 0.5*Math.PI);
      var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
      this.audioPlayers[0].setCrossfadeGain(gain1);
      this.audioPlayers[1].setCrossfadeGain(gain2);
    }
}

// Pattern: Singleton
export default new WebAudioManager();
