let density;
let colorValueToCheckForCollision;
let stateCounter = 0;
let agents = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  density = displayDensity();
  pixelDensity(density);
  backgroundColor = 0;
  initScene();
}

function initScene() {
  colorValueToCheckForCollision = 66;
  background(0);
  fill(colorValueToCheckForCollision, 241, 244);
  textSize(options.txtSize);
  text( //Center the text
    options.txt,
    width / 2 - textWidth(options.txt) / 2,
    height / 2 + options.txtSize / 2
  );

  //needed to reset the agents
  agents = [];
  let step = options.step;
  let widthTimesDensity = width * density;
  let heightTimesDensity = height * density;
  //Get ImageData from 2D-Context
  let container = document.getElementById('p5Container');
  ctx = container.firstChild.getContext("2d");
  let data = ctx.getImageData(0, 0, widthTimesDensity, heightTimesDensity).data;

  for (let i = 0; i < widthTimesDensity; i += step) {
    for (let j = 0; j < heightTimesDensity; j += step) {
      let pixelLocation = (i + j * widthTimesDensity) * 4;
      //red = 0, green = 0, blue = 0, alpha = 0;
      if (data[pixelLocation + 0] == colorValueToCheckForCollision) {
        agents.push(new Agent(i / density, j / density));
      }
    }
  }
}

function draw() {
  smooth();
  background(backgroundColor, options.alphaBackground);
  stroke(255, options.alphaAgents);
  noiseDetail(options.noiseOctave, options.noiseFallOff);
  // Draw agents
  for (let i = 0; i < agents.length; i++) {
    agents[i].draw(options.noiseScale, options.noiseStrength, i, options.strokeWidth, options.drawMode, stateCounter);
  }

  // Draw text
  noStroke();
  fill(1, options.txtAlpha);
  textSize(options.txtSize);
  text(options.txt, width / 2 - textWidth(options.txt) / 2, height / 2 + options.txtSize / 2);
}

function keyReleased() {
  if (keyCode == 32) { //SPACE
    switchStateLogic();
  } else if (key == 's' || key == 'S') {
    saveThumb(650, 350);
  }
}

function switchStateLogic() {
  if (stateCounter < 7) {
    stateCounter++;
    initScene();
  } else {
    stateCounter = 0;
  }
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
