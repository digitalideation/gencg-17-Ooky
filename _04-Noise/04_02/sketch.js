// Some of the var might be initialised in gui.js
var canvas, backgroundBlack, radius;
var actRandomSeed, count, points;

var song;
var analyzer;
var volume;

let isFill;

let colorOverTime = 0;

function preload() {
  song = loadSound('Dyrisk-FlyBoy-Over-You.wav');
}

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  backgroundBlack = 0;
  count = 150;
  points = [count];
  background(backgroundBlack);
  radius = height / 2;

  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  song.loop();
  volume = 0.5;
  isFill = false;
}




function draw() {

  colorOverTime += 0.5;
  if (colorOverTime > 360) {
    colorOverTime = 0;
  }

  let rms = analyzer.getLevel();
  background(backgroundBlack, 50);
  song.amp(volume); //Volume
  // Create points array
  let faderX = mouseX / width;
  let t = millis() / 1000;
  //*volume: without it its more quit and therefore the circle is smaller
  let r = map(55 * rms * 10, 0, 300 * volume, 50, (height / 2));
  let angle = radians(360 / count);

  for (let i = 0; i < count; i++) {
    let radiusRand = r - noise(t, i * faderX) * r / 2;
    let x = width / 2 + cos(angle * i) * radiusRand;
    let y = height / 2 + sin(angle * i) * radiusRand;
    points[i] = createVector(x, y);
  }

  // Draw
  let mappedColorValue = (360 - colorOverTime) - abs(map(rms, 0, 1, 0, 360));
  stroke(colorHsluv(mappedColorValue, 100, 50));
  beginShape();
  for (let i = 0; i < count; i++) {
    if (isFill) {
      fill(colorHsluv(mappedColorValue, 100, 50));
    } else {
      noFill();
    }
    ellipse(points[i].x, points[i].y, 2, 2);
    //filter(BLUR, 6);
    curveVertex(points[i].x, points[i].y);
    if (i == 0 || i == count - 1) {
      curveVertex(points[i].x, points[i].y)
    };
  }
  endShape(CLOSE);
}

function colorHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function mousePressed() {
  isFill = !isFill;
}


// Tools
function keyPressed() {
  if (key == 's' || key == 'S') {
    saveThumb(650, 350)
  };
}

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}
