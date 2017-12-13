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
  myText = "ExampleText";
  myTextWidth = textWidth(myText);
  myColor = color(255, 0, 0);
  myArray = [];
  textFont(myFont);
  fill(255);
  textSize(64);
  text(myText, windowWidth / 2 - myTextWidth * 2, windowHeight / 2 - 64, 200, 200);
  imageLocation = 0;

  loadPixels();
  changeColor();
  updatePixels();
}

function changeColor() {
  for (let x = 0; x < windowWidth; x++) {
    for (let y = 0; y < windowHeight; y++) {
      imageLocation = (x + y * windowWidth)*4;
      if(pixels[x*4+y*windowWidth*4] != 50) {
        pixels[x * 4 + y * windowWidth * 4] = 30;    //r
        pixels[x * 4 + y * windowWidth * 4+1] = 70;  //g
        pixels[x * 4 + y * windowWidth * 4+2] = 110;  //b
      }
    }
  }
}


function draw() {
  //background(50);
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
