let switchOrientation;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  let density = displayDensity();
  pixelDensity(density);
  switchOrientation = false;
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  beginShape();
  let maxRange = map(mouseY, 0, height, 0, 50);
  for (let x = 0; x < width; x++) {
    let nx = map(x, 0, width, 0, maxRange) * millis()/1000;
    let y = height * noise(nx);
    if (switchOrientation) {
      vertex(y, x);
    } else {
      vertex(x, y);
    }
  }
  endShape();

}

function mousePressed() {
  switchOrientation = !switchOrientation;
}


function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
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
