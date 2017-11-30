// Global var
var tileCount = 80;
var max_distance = 50;
var randomSeedValue = 0;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
}

function draw() {

  background(255, 20);
  smooth();
  noFill();
  stroke(color(0), 0);
  strokeWeight(1);

  for (columns = 0; columns < windowWidth*2; columns+=100) {
    for (rows = 0; rows < windowHeight*2; rows+=100) {
      var diameter = dist(mouseX, mouseY, rows, columns);
      diameter = diameter/max_distance*40;
      push();
      translate(rows, columns, diameter*5);
      ellipse(0, 0, diameter, diameter);
      //rect(0, 0, diameter, diameter); //try ellipse(...)
      pop();
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


// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}
