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
  background(50);
  myFont = "Barlow Semi Condensed";
  myText = "Digital Ideation";
  myTextWidth = textWidth(myText);
  myColor = color(255, 0, 0);
  myArray = [];
  textFont(myFont);
  fill(0);
  textSize(128);
  text(myText, windowWidth / 2 - myTextWidth - 200, windowHeight / 2 - 64, 800, 400);
  imageLocation = 0;
}




function draw() {
  loadPixels();
  changeColor();
  changeBorderColor();
  updatePixels();
}

function changeBorderColor() {
  getOutline();
}

function getOutline() {
  for (let x = 0; x < windowWidth; x++) {
    for (let y = 0; y < windowHeight; y++) {

        if( y== 0) {
          pixels[(x * 4 + y * windowWidth * 4 + 0)]= 255;
        }

        /*
        if(x == windowWidth-1) {
          pixels[pixelLocation(x, y, "red")]= 255;
        }
        */

        //reicht es wenn man x und y = 1 setzt in der for-schleife?
        //und anstelle < windowWidth   < windowWidth-1 nehmen?



      //if not top border && not right && not bottom && not LeftTop
        //imageLocation = x+ywindowWith;
        //Check Top
        //if(Pixel oberhalb von diesem Pixel != diesselbe farbe wie der angeschaute pixel)
        //Check TopRight
        //Check Right
        //Check RightBottm
        //Check Bottom
        //Check BottomLeft
        //Check Left
        //Check LeftTop
    }
  }
}
  function changeColor() {
    for (let x = 0; x < windowWidth; x++) {
      for (let y = 0; y < windowHeight; y++) {
        if (pixels[pixelLocation(x,y,"blue")] != 50) {//check for blue value
          pixels[pixelLocation(x,y,"red")] = 255; //r
          pixels[pixelLocation(x,y,"green")] = 255; //g
          pixels[pixelLocation(x,y,"blue")] = 255; //b
        }
      }
    }
  }

  function pixelLocation(x, y, colorValue) {
    if(colorValue === "red") {
      return (x * 4 + y * windowWidth * 4 + 0); //r
    } else if (colorValue ==="green") {
      return (x * 4 + y * windowWidth * 4 + 1); //g
    } else if (colorValue ==="blue") {
      return (x * 4 + y * windowWidth * 4 + 2); //b
    } else {
      return null;
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
