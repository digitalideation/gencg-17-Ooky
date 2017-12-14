// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

class Agent {

  constructor(x, y) {

    let _angle;
    let _isOutside = false;
    let _point = createVector(x, y);
    let _pointStart = createVector(x, y);
    let _pointOld = createVector(x, y);
    let _stepSize = random(250, 500);

    this.draw = function(noiseScale, noiseStrength, p, strokeWidth, drawMode){

      if (drawMode == 1) {
        _angle = noise(_point.x/noiseScale, _point.y/noiseScale, p) * noiseStrength;
      } else {
        _angle = noise(_point.x/noiseScale, _point.y/noiseScale, p) * 24; //
        _angle = (_angle - toInt(_angle)) * noiseStrength;  //
      }

      _point.x += cos(_angle) * _stepSize;
      _point.y += sin(_angle) * _stepSize;

      if(_point.x<-10) _isOutside = true;
      else if(_point.x>width+10) _isOutside = true;
      else if(_point.y<-10) _isOutside = true;
      else if(_point.y>height+10) _isOutside = true;

      if (_isOutside) this.restart();

      // Draw
      strokeWeight(strokeWidth);
      line(_pointOld.x, _pointOld.y, _point.x, _point.y);
      point(_point.x, _point.y);

      _pointOld.set(_point);

      _isOutside = false;
    }

    this.getPosition = function() { return _point; }

    this.getAngle = function() { return _angle; }

    this.setPosition = function(p) { _point = p; }

    this.setAngle = function(angle) { _angle = angle; }

    this.restart = function() {
      _point.set(_pointStart);
      _pointOld.set(_point);
    }

  }

}
