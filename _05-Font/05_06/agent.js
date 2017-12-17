class Agent {

  constructor(x, y) {
    let _angle;
    let _isOutside = false;
    let _point = createVector(x, y);
    let _pointStart = createVector(x, y);
    let _pointOld = createVector(x, y);
    let _stepSize = random(1, 5);

    this.draw = function(noiseScale, noiseStrength, p, strokeWidth, stateCounter) {
      //Calculate Angle based on noise, noiseScale and noiseStrength
      _angle = noise(_point.x / noiseScale, _point.y / noiseScale, p) * 24;
      _angle = (_angle - this.toInt(_angle)) * noiseStrength;
      stroke(options.noiseColor);
      switchState();

      //Check if pixel is outside
      if (_point.x < -10) {
        _isOutside = true;
      } else if (_point.x > width + 10) {
        _isOutside = true;
      } else if (_point.y < -10) {
        _isOutside = true;
      } else if (_point.y > height + 10) {
        _isOutside = true;
      }

      if (_isOutside) {
        this.restart();
      }

      //Draw lines and points
      strokeWeight(strokeWidth);
      line(_pointOld.x, _pointOld.y, _point.x, _point.y);
      point(_point.x, _point.y);
      //reset Point
      _pointOld.set(_point);
      _isOutside = false;
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
          _point.x += tan(_angle) * (_stepSize) +0.01;
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
          _point.x += tan(_angle) * tan(_stepSize) +0.01;
          _point.y += tan(_angle) * (_stepSize) +0.01;
          break;

        case 3:
          options.txtAlpha = 255;
          options.alphaBackground = 1;
          options.alphaAgents = 40;
          options.strokeWidth = 0.1;
          _point.x += (_angle) * (_stepSize);
          _point.y += tan(_angle) * tan(_stepSize) +0.01;
          break;

        case 4:
          //Noise
          options.noiseScale = 1000;
          options.noiseStrength = 100;
          options.noiseOctave = 8;
          options.noiseFallOff = 0.1;
          //Agents
          options.alphaAgents = 10;
          _point.x += cos(_angle) * sin(_stepSize) +0.01;
          _point.y += sin(_angle) * cos(_stepSize) +0.01;
          break;

        case 5:
          //Reset Noise to previous state
          options.noiseScale = 1;
          options.noiseStrength = 50;
          options.noiseOctave = 20;
          options.noiseFallOff = 1;
          //Agents
          options.txtAlpha = 255;
          options.alphaBackground = 0;
          options.alphaAgents = 20;
          options.strokeWidth = 0.1;
          _point.x -= (_angle) * (_stepSize) * millis() / 10000;
          _point.y += (_angle) * (_stepSize) * millis() / 10000;
          break;

        case 6:
          _point.x += cos(_angle) * log(cos(_stepSize));
          _point.y += tan(_angle) * (sin(_stepSize)) +0.01;
          break;

        case 7:
          options.strokeWidth = random(0.1, 3);
          options.txtAlpha = 255;
          _point.x += tan(random(0, 50)) +0.01;
          _point.y += tan(random(0, 50)) +0.01;
          break;

        default:
          options.txtAlpha = 60;
          options.alphaBackground = 15;
          options.alphaAgents = 40;
          options.strokeWidth = 1.2;
          _point.x += tan(_angle) * (_stepSize) +0.01;
          _point.y += (_angle) * (_stepSize);
      }
    }
    this.toInt = function(value) {
      return ~~value;
    }
  }
}
