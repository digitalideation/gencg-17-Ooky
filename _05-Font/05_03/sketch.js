let myFont;
let myText;
let myTextWidth;
let myColor;
let imageLocation;
let r, b, g;
let colorValueToTestFor;
let outlinePixels;


function setup() {
  imageLocation = 0;
  noSmooth();
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  colorValueToTestFor = 50;
  background(colorValueToTestFor);
  myFont = "Barlow Semi Condensed";
  myText = "Digital Ideation";
  myTextWidth = textWidth(myText);
  myColor = color(255, 0, 0);
  myArray = [];
  textFont(myFont);
  fill(0);
  textSize(128);
  text(myText, windowWidth / 2 - myTextWidth - 200, windowHeight / 2 - 64, 800, 400);
  outlinePixels = [];
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
  for (let x = 1; x < windowWidth-1; x++) {
    for (let y = 1; y < windowHeight-1; y++) {


      pixels[pixelLocation(x, y, "red")]= 20;

      imageLocation = x+y*windowWidth;
      //pixels[500+windowWidth*60] = 255;//500+windowWidth*60

      pixels[50000]=255;


        //Check Top
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x,y-1, "blue")]) {
          pixels[pixelLocation(x, y-1, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x, y-1, "red")]);
        }
        //Check TopRight
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x+1,y-1, "blue")]) {
          pixels[pixelLocation(x+1, y-1, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x+1, y-1, "red")]);
        }
        //Check Right
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x+1,y, "blue")]) {
          pixels[pixelLocation(x+1, y, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x+1, y, "red")]);
        }
        //Check RightBottm
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x+1,y+1, "blue")]) {
          pixels[pixelLocation(x+1, y+1, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x+1, y+1, "red")]);
        }
        //Check Bottom
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x,y+1, "blue")]) {
          pixels[pixelLocation(x, y+1, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x, y+1, "red")]);
        }
        //Check BottomLeft
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x-1,y+1, "blue")]) {
          pixels[pixelLocation(x-1, y+1, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x-1, y+1, "red")]);
        }
        //Check Left
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x-1,y, "blue")]) {
          pixels[pixelLocation(x-1, y, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x-1, y, "red")]);
        }
        //Check LeftTop
        if(pixels[pixelLocation(x, y, "blue")]
        != pixels[pixelLocation(x-1,y-1, "blue")]) {
          pixels[pixelLocation(x-1, y-1, "red")] = 255;
          outlinePixels.push(pixels[pixelLocation(x-1, y-1, "red")]);
        }
    }
  }
}
  function changeColor() {
    for (let x = 0; x < windowWidth; x++) {
      for (let y = 0; y < windowHeight; y++) {
        if (pixels[pixelLocation(x,y,"blue")] != colorValueToTestFor) {//check for blue value
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
