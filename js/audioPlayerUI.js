class AudioPlayerUI {
  constructor(audioPlayer, playBtn, volumeSlider, visualCanvas, progressBar, durationField,
    currTimeField, effect1Btn, effect1Slider) {
    this.audioPlayer = audioPlayer;
    this.playBtn = playBtn;
    this.volumeSlider = volumeSlider;
    this.visualCanvas = visualCanvas;
    this.progressBar = progressBar;
    this.durationField = durationField;
    this.currTimeField = currTimeField;
    this.effect1Btn = effect1Btn;
    this.effect1Slider = effect1Slider;
    // Events
    this.playBtn.onclick = this.play.bind(this);
    this.volumeSlider.onchange = this.changeVolume.bind(this);
    this.effect1Slider.onchange = this.changeFrequency.bind(this);
    this.effect1Btn.onchange = this.toggleEffect1.bind(this)  ;

    this.audioPlayer.audioElement.ontimeupdate = this.updateProgressBar.bind(this);
    this.audioPlayer.audioElement.onended = this.updatePlayButton.bind(this);


  }

  play() {
    // play or pause track depending on state
    if (this.playBtn.dataset.playing === 'false') {
        this.audioPlayer.play();
        this.playBtn.dataset.playing = 'true';
        $(this.playBtn).find("i").removeClass("fa-play");
        $(this.playBtn).find("i").addClass("fa-pause");

        $(this.durationField).html(this.secToTimeString(this.audioPlayer.audioElement.duration));
    } else if (this.playBtn.dataset.playing === 'true') {
        this.audioPlayer.pause();
        this.playBtn.dataset.playing = 'false';
        $(this.playBtn).find("i").removeClass("fa-pause");
        $(this.playBtn).find("i").addClass("fa-play");
    }

  }

  updateProgressBar(event) {
    $(this.currTimeField).html(this.secToTimeString(this.audioPlayer.audioElement.currentTime));
    this.progressBar.style.width = this.audioPlayer.audioElement.currentTime / this.audioPlayer.audioElement.duration * 100 + '%';
  }

  updatePlayButton(event) {
    this.playBtn.dataset.playing = 'false';
    $(this.playBtn).find("i").removeClass("fa-pause");
    $(this.playBtn).find("i").addClass("fa-play");
  }

  secToTimeString(s) {
    var dateTime = new Date(null);
    dateTime.setSeconds(s);
    return dateTime.toISOString().substr(14, 5);
  }

  toggleEffect1(event) {
    //console.log(event);
    this.audioPlayer.toggleLowPassFilter();
  }

  changeVolume(event) {
    this.audioPlayer.setVolume(event.target.value);
  }

  changeFrequency(event) {
    //console.log(event.target.value + " Hz");
    this.audioPlayer.setFilterFrequency(event.target.value);
  }

}

export default AudioPlayerUI;
