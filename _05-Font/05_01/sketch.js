function setup() {
  fill('#ED225D');
  textFont(myFont);
  textSize(36);
  text('p5*js', 10, 50);
}




function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  let density = displayDensity();
  pixelDensity(density);
}

function draw() {
  background(50);
  textFont("Barlow Semi Condensed");
  fill(255);
  textSize(64);
  text("Google Satisfy font", windowWidth/2-64, windowHeight/2-64, 200, 200);
}




function mousePressed() {

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
