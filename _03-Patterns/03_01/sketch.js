// Global var
let strokeWeightFactor;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  strokeWeightFactor = 5;
}

function draw() {
  translate(width / options.tileCount / 2, height / options.tileCount / 2);
  background(25, options.backgroundAlphaValue);
  smooth();
  noFill();
  stroke(options.circleColor);
  strokeWeight(map(mouseY, 0, mouseY, 0, strokeWeightFactor));



  for (columns = 0; columns < options.tileCount; columns++) {
    for (rows = 0; rows < options.tileCount; rows++) {
      posX = width / options.tileCount * rows;
      posY = height / options.tileCount * columns;
      if (options.enableMouseX) {
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


// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}
