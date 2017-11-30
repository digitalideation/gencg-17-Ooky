var options = {
  tileCount: 20,
  backgroundAlphaValue: 50,
  circleColor: [47, 161, 214], //RGB
  enableMouseX: false,
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(options, 'tileCount').min(1).max(50).step(1);
  gui.add(options, 'backgroundAlphaValue').min(0).max(255).step(1);
  gui.add(options, 'enableMouseX');
  gui.addColor(options, 'circleColor');
};
