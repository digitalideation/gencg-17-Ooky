// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

class Agent {

  constructor(x, y) {
    let _counter = 0;
    let _angle;
    let _isOutside = false;
    let _point = createVector(x, y);
    let _pointStart = createVector(x, y);
    let _pointOld = createVector(x, y);
    let _stepSize = random(1, 5);

    this.draw = function(noiseScale, noiseStrength, p, strokeWidth, drawMode, stateCounter) {

      if (drawMode == 1) {
        _angle = noise(_point.x / noiseScale, _point.y / noiseScale, p) * noiseStrength;
      } else {
        _angle = noise(_point.x / noiseScale, _point.y / noiseScale, p) * 24; //
        _angle = (_angle - toInt(_angle)) * noiseStrength; //
      }

      switchState();









      if (_point.x < -10) _isOutside = true;
      else if (_point.x > width + 10) _isOutside = true;
      else if (_point.y < -10) _isOutside = true;
      else if (_point.y > height + 10) _isOutside = true;

      if (_isOutside) this.restart();

      // Draw
      strokeWeight(strokeWidth);
      line(_pointOld.x, _pointOld.y, _point.x, _point.y);
      point(_point.x, _point.y);

      _pointOld.set(_point);

      _isOutside = false;
    }


    this.getPosition = function() {
      return _point;
    }

    this.getAngle = function() {
      return _angle;
    }

    this.setPosition = function(p) {
      _point = p;
    }

    this.setAngle = function(angle) {
      _angle = angle;
    }

    this.restart = function() {
      _point.set(_pointStart);
      _pointOld.set(_point);
    }


    function switchState() {
      switch (stateCounter) {
        case 0:
          options.txtAlpha = 60;
          options.alphaBackground = 15;
          options.alphaAgents = 40;
          options.strokeWidth = 1.2;
          _point.x += tan(_angle) * (_stepSize);
          _point.y += (_angle) * (_stepSize);
          break;

        case 1:
          options.txtAlpha = 0;
          options.alphaBackground = 255;
          options.alphaAgents = 255;
          options.strokeWidth = 0.1;
          _point.x += (_angle) * (_stepSize);
          _point.y += (_angle) * (_stepSize);
          break;

        case 2:
          options.txtAlpha = 128;
          options.alphaBackground = 11;
          options.alphaAgents = 180;
          options.strokeWidth = 0.5;
          _point.x += tan(_angle) * tan(_stepSize);
          _point.y += tan(_angle) * (_stepSize);
          break;

        case 3:
          options.txtAlpha = 255;
          options.alphaBackground = 1;
          options.alphaAgents = 40;
          options.strokeWidth = 0.1;
          _point.x += (_angle) * (_stepSize);
          _point.y += tan(_angle) * tan(_stepSize);
          break;

        case 4:
          options.alphaAgents = 10;
          _point.x += cos(_angle) * sin(_stepSize);
          _point.y += sin(_angle) * cos(_stepSize);
          break;

        case 5:
          options.txtAlpha = 255;
          options.alphaBackground = 0;
          options.alphaAgents = 20;
          options.strokeWidth = 0.1;
          _point.x -= (_angle) * (_stepSize) * millis() / 10000;
          _point.y += (_angle) * (_stepSize) * millis() / 10000;
          break;

        case 6:
          _point.x += cos(_angle) * log(cos(_stepSize));
          _point.y += tan(_angle) * log(sin(_stepSize));
          break;

        case 7:
          options.strokeWidth = random(0.1, 3);
          options.txtAlpha = 255;
          _point.x += tan(random(0, 50));
          _point.y += tan(random(0, 50));
          break;

        default:
          _point.x += tan(_angle) * (_stepSize);
          _point.y += (_angle) * (_stepSize);

      }
    }

  }

}
