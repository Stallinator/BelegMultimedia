class VideoPlayer {
  constructor(url, videoElement, dash, canvas, canvas2, keyColorCheckFn) {
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
    this.keyColorCheckFn = keyColorCheckFn;

    this.canvas = canvas;
    this.context2d = canvas.getContext('2d');

    this.canvas2 = canvas2;
    this.context2d2 = canvas2.getContext('2d');

    this.setSizeToVideoElement();
    this.drawFrame();
    window.addEventListener('resize', function() {
      this.setSizeToVideoElement();
      this.drawFrame();
    }.bind(this), false);

    videoElement.addEventListener('play', function () {
      this.drawFrame();
    }.bind(this), false);

    videoElement.addEventListener('loadeddata', function () {
      this.drawFrame();
    }.bind(this), false);

    videoElement.addEventListener('seeked', function () {
      this.drawFrame();
    }.bind(this), false);
  }

  setSizeToVideoElement() {
    this.width = this.videoElement.offsetWidth;
    this.height = this.width / 1.777777778;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas2.width = this.width;
    this.canvas2.height = this.height;
  }

  drawFrame() {
    this.context2d.drawImage(this.videoElement, 0, 0, this.width, this.height);
    let imageData = this.context2d.getImageData(0, 0, this.width, this.height);    

    for (let i = 0, pixelStart = 0
      ; i < imageData.data.length / 4
      ; i++, pixelStart = i * 4) {
      let [r, g, b] = imageData.data.slice(pixelStart, pixelStart + 3 + 1);
      if(this.keyColorCheckFn(r, g, b)) imageData.data[pixelStart + 3] = 0;
    }

    this.context2d.putImageData(imageData, 0, 0);
    this.context2d2.putImageData(imageData, 0, 0);

    if (this.videoElement.paused || this.videoElement.ended) return;
    
    requestAnimationFrame(this.drawFrame.bind(this));
  }
}
export default VideoPlayer;
