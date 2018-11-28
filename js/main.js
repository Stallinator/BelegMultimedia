let audioCtx = new AudioContext();

var gainNode =audioCtx.createGain();
gainNode.gain.value = 0.2;

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
        //source.start(0);
    });
};

request.send();
