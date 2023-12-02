const audioCtx = new AudioContext();

const oscillatorNode = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

gainNode.gain = 1; // volume
gainNode.channelCount = 2; // stereo
gainNode.channelInterpretation = "speakers"; // or "discrete"

var Keys = {
  q: 60,
  w: 62,
  e: 64,
  r: 65,
  t: 67,
  z: 69,
  u: 71,
  i: 72,
  o: 74,
  p: 76,
} // chords

document.addEventListener('keydown', function(e) {
  if (Keys.hasOwnProperty(e.key)) {
    if (audioCtx.state === "suspended") {
      audioCtx.resume()
      Play(Keys[e.key]);
    } else if (audioCtx.state === "running") {
      Play(Keys[e.key]);
    }
  }
});

document.addEventListener('keyup', function(e) {
  if (Keys.hasOwnProperty(e.key)) {
    audioCtx.suspend();
  }
});

function Play(m) {
  oscillatorNode.type = "triangle"; // types: sine, square, sawtooth, triangle.
  oscillatorNode.frequency.setTargetAtTime(Math.pow(2, (m-69)/12)*250, audioCtx.currentTime, 0); // frequency Hz
  oscillatorNode.connect(audioCtx.destination);
  oscillatorNode.start();
}
