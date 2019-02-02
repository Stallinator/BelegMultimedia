import VideoPlayer from './videoPlayer.js';

const videoElement1 = document.querySelector('#videoplayer1');
let videoplayer1 = new VideoPlayer("../media/video.mpd", videoElement1, true);
const videoElement2 = document.querySelector('#videoplayer2');
let videoplayer2 = new VideoPlayer("../media/video.mpd", videoElement2, true);
