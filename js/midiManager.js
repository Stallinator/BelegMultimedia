export default class MidiManager  {

    constructor() {
     this.midiControllerName = 'CMD MM-1';
     if(navigator.requestMIDIAccess) {
       let promise = navigator.requestMIDIAccess();
       promise.then(this.onMidiSuccess.bind(this));
     }
    }
    onMidiSuccess(midi) {
      const inputs = midi.inputs.values();
      for(let input of inputs) {
        input.onmidimessage = this.onMidiMessage.bind(this);
      }
    }
    onMidiMessage(event) {
      window.dispatchEvent(new CustomEvent('midi', {detail: event}));
    }
  }