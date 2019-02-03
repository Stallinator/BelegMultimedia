class VideoPlayer {
  constructor(url, videoElement, dash, canvas) {
    if (!url) {
      alert("No URL specified!");
      return;
    } else {
      if (dash) {
        var player = dashjs.MediaPlayer().create();
        player.initialize(videoElement, url, false);
      }
    }

    this.videoElement = videoElement;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.setSizeToVideoElement();
    this.drawImage();
    window.addEventListener('resize', function() {
      this.setSizeToVideoElement();
      this.drawImage();
    }.bind(this), false);

    videoElement.addEventListener('play', function () {
      this.drawImageTimer();
    }.bind(this), false);

    videoElement.addEventListener('seeked', function () {
      this.drawImage();
    }.bind(this), false);
  }

  setSizeToVideoElement() {
    this.width = this.videoElement.offsetWidth;
    this.height = this.width / 1.777777778;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  drawImageTimer() {
    if (this.videoElement.paused || this.videoElement.ended)
    return;
    
    this.setSizeToVideoElement();
    this.drawImage();

    setTimeout(function () {
      this.drawImageTimer();
    }.bind(this), 0);
  }

  drawImage() {
    this.ctx.drawImage(this.videoElement, 0, 0, this.width, this.height);
    let frame = this.ctx.getImageData(0, 0, this.width, this.height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g > 100 && r > 100 && b < 43)
        frame.data[i * 4 + 3] = 0;
    }
    this.ctx.putImageData(frame, 0, 0);
    return;
  }
}
export default VideoPlayer;
