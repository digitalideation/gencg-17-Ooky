"use strict";
// Global var
const squareSize = 40;
let rows;
let columns
let startingCellIndex;
let currentCell;
let cells = [];

//Colors
let colorHighlight;
let colorWalls;
let colorVisited;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight - 45);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  //Grid
  setupColors();
  initGridAndCells();
  setStartingCell();
  //frameRate(5);
}

function draw() {
  background(0);
  drawStartingCell();
  drawGrid();
}

function initGridAndCells() {
  //initGridAndCells
  rows = floor(windowHeight / squareSize);
  columns = floor(windowWidth / squareSize);
  //Cells
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let cell = new Cell(x, y);
      cells.push(cell);
    }
  }
}

function setupColors() {
  colorHighlight = color('rgba(0, 255, 0, 255)');
  colorWalls = color(255);
  colorVisited = color('rgba(0, 255, 0, 100)');
}

function setStartingCell() {
  startingCellIndex = floor(random(0, columns * rows - 1));
  currentCell = cells[startingCellIndex];
}

function drawStartingCell() {
  let positionX = cells[startingCellIndex].x * squareSize;
  let positionY = cells[startingCellIndex].x * squareSize;
  fill(colorVisited);
  rect(positionX, positionY, squareSize, squareSize);
}

function drawGrid() {
  for(let i = 0; i < cells.length; i++) {
    cells[i].drawGrid();
  }
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
