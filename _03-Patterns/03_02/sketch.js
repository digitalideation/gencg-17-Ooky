// Global var
var max_distance = 50;
var randomSeedValue = 0;
var stateCounter = 0;


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

  for (columns = 0; columns < windowWidth * 2; columns += 100) {
    for (rows = 0; rows < windowHeight * 2; rows += 100) {
      var diameter = dist(mouseX, mouseY, rows, columns);
      diameter = diameter / max_distance * 40;
      push();
      translate(rows, columns, diameter * 5);
      switchState(diameter);
      pop();
    }
  }
}

function mousePressed() {

}

function switchStateLogic() {
  if (stateCounter < 6) {
    stateCounter++;
  } else {
    stateCounter = 0;
  }
}

function switchState(diameter) {
  switch (stateCounter) {
    case 0:
      arc(options.arcX,
        options.arcY,
        diameter,
        diameter,
        options.arcStartRadian,
        options.arcEndRadian);
      break;
    case 1:
      line(options.lineX,
        options.lineY,
        diameter,
        diameter);
      break;
    case 2:
      strokeWeight(options.pointStrokeWeight);
      for (var i = 1; i <= options.pointCounts; i++) {
        point(mouseX * i, mouseY * i);
      }
      break;
    case 3:
      quad(options.quadX, options.quadY, windowWidth - mouseX, 0, windowHeight - mouseY, 0, mouseX, mouseY);
      break;
    case 4:
      ellipse(options.ellipseX, options.ellipseY, diameter, diameter);
      break;
    case 5:
      triangle(diameter, diameter, options.triangleX2, options.triangleY2, mouseX, mouseY);
      break;
    case 6:
      rect(options.rectX, options.rectY, diameter, diameter);
      break;
    default:
      ellipse(options.ellipseX, options.ellipseY, diameter, diameter);
  }
}

function keyPressed(event) {
  if (key == 's' || key == 'S') {
    saveThumb(650, 350);
  } else if (event.which == 32) { //space
    switchStateLogic();
  }
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
