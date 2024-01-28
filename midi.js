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
  a: 77,
  s: 79,
  d: 81,
  f: 83,
  g: 84,
  h: 86,
  j: 88,
  k: 89,
  l: 91,
  y: 93,
  x: 95,
  c: 96,
  v: 98,
  b: 100,
  n: 101,
  m: 103,
} // notes

document.addEventListener('keydown', function(e) {
  if (Keys.hasOwnProperty(e.key)) {
    if (audioCtx.state === "suspended") {
      document.getElementById("K" + Keys[e.key]).style.backgroundColor = "red";
      setTimeout(function(){
        document.getElementById("K" + Keys[e.key]).style.backgroundColor = "";
      }, 1000);
      audioCtx.resume()
      Play(Keys[e.key]);
    } else if (audioCtx.state === "running") {
      document.getElementById("K" + Keys[e.key]).style.backgroundColor = "red";
      setTimeout(function(){
        document.getElementById("K" + Keys[e.key]).style.backgroundColor = "";
      }, 1000);
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
