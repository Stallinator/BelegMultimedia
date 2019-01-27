class AudioPlayerUI {
  constructor(audioPlayer, playBtn, volumeSlider, visualCanvas) {
    this.audioPlayer = audioPlayer;
    this.playBtn = playBtn;
    this.volumeSlider = volumeSlider;
    this.visualCanvas = visualCanvas;
    // Events
    this.playBtn.onclick = this.play.bind(this);
    this.volumeSlider.onclick = this.changeVolume.bind(this);//this.audioPlayer.onVolumeChange.bind(this.audioPlayer);

  }

  play() {
    this.audioPlayer.togglePlay();
  }

  changeVolume(event) {
    this.audioPlayer.setVolume(event.target.value);
  }
}

export default AudioPlayerUI;
