
var options = {
    // Text
    txt: "Digital Ideation",
    txtSize: 175,
    txtAlpha: 40,
    iterationStep: 8,
    refresh: function () { initScene() },
    // Draw
    alphaBackground: 1,
    alphaAgents: 32,
    strokeWidth: 0.8,
    // Noise
    noiseScale: 1,
    noiseStrength: 50,
    noiseOctave: 20,
    noiseFallOff: 1,
    noiseColor: [255, 255, 255],
};

window.onload = function() {
  var gui = new dat.GUI();
  // Noise
  var f1 = gui.addFolder('Noise');
  f1.add(options, 'noiseScale').min(1).max(1000).step(1);
  f1.add(options, 'noiseStrength').min(0).max(100).step(1);
  f1.add(options, 'noiseOctave').min(0).max(20).step(1);
  f1.add(options, 'noiseFallOff').min(0).max(1).step(.05);
  // Text
  gui.add(options, 'txt');
  gui.add(options, 'txtSize').step(1);
  gui.add(options, 'txtAlpha').min(0).max(255).step(.1);
  gui.add(options, 'iterationStep').min(1).max(100).step(1);
  // Draw
  gui.add(options, 'alphaBackground').min(0).max(255).step(.1);
  gui.add(options, 'alphaAgents').min(0).max(255).step(.1);
  gui.add(options, 'strokeWidth').min(0).max(10).step(.1);
  gui.addColor(options, 'noiseColor');
  // Refresh scene
  gui.add(options, 'refresh');
};
