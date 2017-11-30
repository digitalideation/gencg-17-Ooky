// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
let tileCount, circleColor, strokeWeightFactor, backgroundAlphaValue;
let enableMouseX;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  tileCount = 20;
  circleColor = color(255, 100);
  strokeWeightFactor = 5;
  backgroundAlphaValue = 50;
  enableMouseX = false;
}

function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);
  background(25, backgroundAlphaValue);
  smooth();
  noFill();
  stroke(circleColor);
  strokeWeight(map(mouseY, 0, mouseY, 0, strokeWeightFactor));



  for (columns = 0; columns < tileCount; columns++) {
    for (rows = 0; rows < tileCount; rows++) {
      posX = width / tileCount * rows;
      posY = height / tileCount * columns;
      if (enableMouseX) {
        ellipse(posX + 0, posY + 0, mouseY / 15, mouseX / 15);
      } else {
          ellipse(posX + 0, posY + 0, mouseY / 15, mouseY / 15);
      }
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}
