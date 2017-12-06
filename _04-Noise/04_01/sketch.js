function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
}

function draw() {
  background(0, 0, 0, 25);
  noFill();
  stroke(255);
  beginShape();
  var maxRange = map(mouseY, 0, height, 0, 5);
  for (var x = 0; x < width; x++) {
    var nx = millis() / 1000 * map(x, 0, width, 0, maxRange);
    var y = height * noise(nx);
    vertex(x, y);
  }
  endShape();
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
