
var options = {
    // Mode
    agentsType: 1,
    // Text
    txt: "Digital Ideation",
    txtSize: 250,
    txtGray: 1,
    txtAlpha: 40,
    step: 8,
    refresh: function () { initScene() },
    // Draw
    alphaBackground: 6,
    alphaAgents: 25,
    strokeWidth: 0.1,
    // Noise
    noiseScale: 1,
    noiseStrength: 50,
    drawMode: 2,
    noiseOctave: 20,
    noiseFallOff: 1,
};

window.onload = function() {
  var gui = new dat.GUI();

  // Noise
  var f1 = gui.addFolder('Noise');
  f1.add(options, 'noiseScale').min(1).max(1000).step(1);
  f1.add(options, 'noiseStrength').min(0).max(100).step(1);
  f1.add(options, 'noiseOctave').min(0).max(20).step(1);
  f1.add(options, 'noiseFallOff').min(0).max(1).step(.05);
  f1.add(options, 'drawMode', [1, 2] );
  f1.add(options, 'agentsType', [1, 2] );
  // Text
  gui.add(options, 'txt');
  gui.add(options, 'txtSize').step(1);
  gui.add(options, 'txtGray').min(1).max(255).step(1);
  gui.add(options, 'txtAlpha').min(0).max(255).step(.1);
  gui.add(options, 'step').min(1).max(100).step(1);
  // Refresh text
  gui.add(options, 'refresh');
  // Draw
  gui.add(options, 'alphaBackground').min(0).max(255).step(.1);
  gui.add(options, 'alphaAgents').min(0).max(255).step(.1);
  gui.add(options, 'strokeWidth').min(0).max(10).step(.1);

};
