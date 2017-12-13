let myFont;
let myText;
let myTextWidth;
let myColor;
let imageLocation;
let r, b, g;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  let density = displayDensity();
  pixelDensity(density);
  background(50);
  myFont = "Barlow Semi Condensed";
  myText = "Digital Ideation";
  myTextWidth = textWidth(myText);
  myColor = color(255, 0, 0);
  myArray = [];
  textFont(myFont);
  fill(0);
  textSize(128);
  text(myText, windowWidth / 2 - myTextWidth-800/2, windowHeight / 2 - 64, 800, 400);
  imageLocation = 0;
}




function draw() {
  loadPixels();
  changeColor();
  updatePixels();
}

function changeColor() {
  let rValue = map(mouseX, 0, windowWidth, 0, 255);
  let gValue = map(mouseY, 0, windowHeight, 0, 255);
  for (let x = 0; x < windowWidth; x++) {
    for (let y = 0; y < windowHeight; y++) {
      imageLocation = (x + y * windowWidth) * 4;
      if (pixels[x * 4 + y * windowWidth * 4+2] != 50) {
        pixels[x * 4 + y * windowWidth * 4] = rValue; //r
        pixels[x * 4 + y * windowWidth * 4 + 1] = gValue; //g
        pixels[x * 4 + y * windowWidth * 4 + 2] = 0; //b
      }
    }
  }
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
