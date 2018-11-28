let audioCtx = new AudioContext();

var gainNode =audioCtx.createGain();

gainNode.connect(audioCtx.destination);
let source = audioCtx.createBufferSource();

let request = new XMLHttpRequest();

request.open('GET', './basic_beat.wav', true);
request.responseType = 'arraybuffer';

request.onload = function() {
    let audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
        source.connect(gainNode);
        source.loop = true;
      //  source.start(0);
    });
};
document.getElementById('volume').addEventListener('change', function () {
  gainNode.gain.value = this.value;
 });

request.send();
