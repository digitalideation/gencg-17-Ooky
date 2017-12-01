var options = {
  arcX: 0,
  arcY: 0,
  arcStartRadian: 90,
  arcEndRadian: 180,

  lineX: 90,
  lineY: 0,

  pointCounts: 5,
  pointStrokeWeight: 10,

  quadX: 0,
  quadY: 0,

  ellipseX: 0,
  ellipseY: 0,

  triangleX2: 0,
  triangleY2: 0,

  rectX:0,
  rectY:0,

  fillColor: [0, 0, 0],
  fillAlpha: 0,

  strokeColor: [0, 0, 0],
  strokeAlpha: 255,

  max_distance: 50,

  background_alpha: 20,
};

window.onload = function() {
  var gui = new dat.GUI();

  var myGeneral = gui.addFolder('general');
  myGeneral.addColor(options, 'fillColor');
  myGeneral.add(options, 'fillAlpha').min(0).max(255).step(1);
  myGeneral.addColor(options, 'strokeColor');
  myGeneral.add(options, 'strokeAlpha').min(0).max(255).step(1);
  myGeneral.add(options, 'max_distance').min(0).max(500).step(1);
  myGeneral.add(options, 'background_alpha').min(0).max(500).step(1);

  var myArc = gui.addFolder('arc');
  myArc.add(options, 'arcX').min(0).max(360).step(1);
  myArc.add(options, 'arcY').min(0).max(360).step(1);
  myArc.add(options, 'arcStartRadian').min(0).max(3.6).step(.1);
  myArc.add(options, 'arcEndRadian').min(0).max(3.6).step(.1);

  var myLine = gui.addFolder('line');
  myLine.add(options, 'lineX').min(0).max(360).step(1);
  myLine.add(options, 'lineY').min(0).max(360).step(1);

  var myPoint = gui.addFolder('point');
  myPoint.add(options, 'pointCounts').min(1).max(10).step(1);
  myPoint.add(options, 'pointStrokeWeight').min(1).max(100).step(1);

  var myQuad = gui.addFolder('quad');
  myQuad.add(options, 'quadX').min(0).max(100).step(1);
  myQuad.add(options, 'quadY').min(0).max(100).step(1);

  var myEllipse = gui.addFolder('ellipse');
  myEllipse.add(options, 'ellipseX').min(0).max(100).step(1);
  myEllipse.add(options, 'ellipseY').min(0).max(100).step(1);

  var myTriangle = gui.addFolder('triangle');
  myTriangle.add(options, 'triangleX2').min(0).max(100).step(1);
  myTriangle.add(options, 'triangleY2').min(0).max(100).step(1);

  var myRect = gui.addFolder('rect');
  myRect.add(options, 'rectX').min(0).max(100).step(1);
  myRect.add(options, 'rectY').min(0).max(100).step(1);


};
