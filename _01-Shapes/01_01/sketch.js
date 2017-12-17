let isMousePressed = false;
let randomColorValue;
let randomSaturationValue;
let colorValueCounter = 0;
let colorCycleIteration = 3;
let strokeWeightValue = 20;


function setup() {
  randomColorValue = toInt(random(360));
  randomSaturationValue = toInt(random(100));
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  let density = displayDensity();
  pixelDensity(density);
  // Colors and drawing modes
  background(255);
  smooth();
}

function draw() {
  smooth();
  noFill();
  if (isMousePressed) {
    //let randomColor = color(random(255), random(255), random(255));
    let randomColor2 = color('hsl(' + randomColorValue + ', ' + randomSaturationValue + '%, 50%)');
    push();

    translate(width / 2, height / 2);

    let circleResolution = toInt(map(mouseY + 100, 0, height, 2, 10));
    let radius = mouseX - width / 2 + 0.5;
    let angle = TWO_PI / circleResolution;

    strokeWeight(strokeWeightValue);
    stroke(randomColor2, 25);

    beginShape();
    for (i = 0; i <= circleResolution; i++) {
      let x = 0 + cos(angle * i) * radius;
      let y = 0 + sin(angle * i) * radius;
      vertex(x, y);
    }
    endShape();
    pop();
  }
}

function mousePressed() {
  isMousePressed = true;
}

function mouseReleased() {
  isMousePressed = false;
  if (colorValueCounter >= colorCycleIteration) {
    randomColorValue = abs(randomColorValue - toInt(random(350)));
    colorValueCounter = 0;
    strokeWeightValue = 20;
  } else {
    colorValueCounter++;
    strokeWeightValue -= 5;
  }
  randomSaturationValue = toInt(random(100));
}

function keyPressed() {
  // Clear sketch
  if (keyCode === 32) background(255) // 32 = SPACE BAR
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}
