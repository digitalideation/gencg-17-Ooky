// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Some of the var might be initialised in gui.js
let agents, density;
let colorToCheck;
let stateCounter = 4;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  density = displayDensity();
  pixelDensity(density);
  backgroundColor = 0;
  initScene();
}

function initScene() {
  colortoCheck = 66;
  background(0);
  fill(colortoCheck, 241, 244); //needed for collision
  textSize(options.txtSize);
  text(options.txt, width / 2 - textWidth(options.txt) / 2, height / 2 + options.txtSize / 2);

  agents = [];
  let step = options.step;
  let myWidth = width * density;
  let myHeigth = height * density;
  let container = document.getElementById('p5Container');
  ctx = container.firstChild.getContext("2d");
  let data = ctx.getImageData(0, 0, myWidth, myHeigth).data;
  for (let i = 0; i < myWidth; i += step) {
    for (let j = 0; j < myHeigth; j += step) {
      if (data[((i + j * myWidth) * 4) + 0] == colortoCheck) { //r=0,g=0,b=0
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

  let deltaTime = millis() / 10000;

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
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    background(backgroundColor);
  } else if (keyCode == 32) { //SPACE
    switchStateLogic();
  } else if (key == 's' || key == 'S') {
    saveThumb(650, 350);
  } else if (key == '1') {
    options.drawMode = 1;
  } else if (key == '2') {
    options.drawMode = 2;
  } else if (key == ' ') {
    let newNoiseSeed = floor(random(100000));
    noiseSeed(newNoiseSeed);
  } else if (keyCode == UP_ARROW) {
    options.noiseFallOff += 0.05;
    checkNoiseFallOffRange();
  } else if (keyCode == DOWN_ARROW) {
    options.noiseFallOff -= 0.05;
    checkNoiseFallOffRange();
  } else if (keyCode == LEFT_ARROW) {
    options.noiseOctave--;
    checkNoiseOctaveRange();
  } else if (keyCode == RIGHT_ARROW) {
    options.noiseOctave++;
    checkNoiseOctaveRange();
  }
}

function checkNoiseOctaveRange() {
  if (options.noiseOctave < 0) {
    options.noiseOctave = 0;
  }
  if (options.noiseOctave > 1) {
    options.noiseOctave = 1;
  }
}

function checkNoiseFallOffRange() {
  if (options.noiseFallOff > 1.0) {
    options.noiseFallOff = 1.0;
  }
  if (options.noiseFallOff < 0.0) {
    options.noiseFallOff = 0.0;
  }
}


function switchStateLogic() {
  if (stateCounter <= 7) {
    stateCounter++;
    initScene();
  } else {
    stateCounter = 0;
  }
  console.log(stateCounter);
}


// Tools
// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

//  conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}
