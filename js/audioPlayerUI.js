class AudioPlayerUI {
  constructor(audioPlayer, playBtn, volumeSlider, visualCanvas, progressBar) {
    this.audioPlayer = audioPlayer;
    this.playBtn = playBtn;
    this.volumeSlider = volumeSlider;
    this.visualCanvas = visualCanvas;
    this.progressBar = progressBar;
    // Events
    this.playBtn.onclick = this.play.bind(this);
    this.volumeSlider.onchange = this.changeVolume.bind(this);//this.audioPlayer.onVolumeChange.bind(this.audioPlayer);

    this.audioPlayer.audioElement.ontimeupdate = this.updateProgressBar.bind(this);


  }

  play() {
    // play or pause track depending on state
    if (this.playBtn.dataset.playing === 'false') {
        this.audioPlayer.play();
        this.playBtn.dataset.playing = 'true';
        $(this.playBtn).find("i").removeClass("fa-play");
        $(this.playBtn).find("i").addClass("fa-pause");
    } else if (this.playBtn.dataset.playing === 'true') {
        this.audioPlayer.pause();
        this.playBtn.dataset.playing = 'false';
        $(this.playBtn).find("i").removeClass("fa-pause");
        $(this.playBtn).find("i").addClass("fa-play");
    }

  }

  updateProgressBar(event) {
    this.progressBar.style.width = this.audioPlayer.audioElement.currentTime / this.audioPlayer.audioElement.duration * 100 + '%';
  }


  changeVolume(event) {
    this.audioPlayer.setVolume(event.target.value);
  }
}

export default AudioPlayerUI;
