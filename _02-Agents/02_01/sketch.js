"use strict";
// Global var
let rows;
let columns

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight - 45);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  initGridAndCells();


}

function draw() {

}

function initGridAndCells() {

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
