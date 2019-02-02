class VideoPlayer {
  constructor(url, videoElement, dash) {
    if (!url) {
      alert("No URL specified!");
      return;
    }else {
      if(dash) {
        var player = dashjs.MediaPlayer().create();
        player.initialize(videoElement, url, false);
      }

  

    }
  }
}
export default VideoPlayer;
