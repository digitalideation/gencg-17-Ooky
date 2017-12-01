"use strict";
// Global var
const squareSize = 30;
let rows;
let columns
let startingCellIndex;
let currentCell;
let cells = [];
let stack = [];

//Colors
let colorHighlight;
let colorWalls;
let colorVisited;


function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
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
  currentCell.highlight();
  currentCell.visited = true;

  //STEP 1
  let nextCell = currentCell.getRandomNextNeighbourCell();
  if (nextCell != null) {
    //STEP 2
    stack.push(currentCell);
    //STEP 3
    removeWallsBetweenCells(currentCell, nextCell);
    //STEP 4
    currentCell = nextCell;
    nextCell.visited = true;
  } else if (stack.length > 0) {
    currentCell = stack.pop();
  }
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
  colorHighlight = color('rgba(0, 255, 0, 1)');
  colorWalls = color(255);
  colorVisited = color('rgba(50, 255, 0, 0.5)');
}

function setStartingCell() {
  startingCellIndex = floor(random(0, columns * rows - 1));
  currentCell = cells[startingCellIndex];
}

function drawStartingCell() {
  let positionX = cells[startingCellIndex].x * squareSize;
  let positionY = cells[startingCellIndex].y * squareSize;
  fill(colorVisited);
  rect(positionX, positionY, squareSize, squareSize);
}

function drawGrid() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].drawGrid();
  }
}

function removeWallsBetweenCells(currentCell, nextCell) {
  let differenceVertical = currentCell.x - nextCell.x;
  if (differenceVertical == 1) {
    currentCell.wallMap["LEFT"] = false;
    nextCell.wallMap["RIGHT"] = false;
  } else if (differenceVertical == -1) {
    currentCell.wallMap["RIGHT"] = false;
    nextCell.wallMap["LEFT"] = false;
  }
  let differenceHorizontal = currentCell.y - nextCell.y;
  if (differenceHorizontal == 1) {
    currentCell.wallMap["TOP"] = false;
    nextCell.wallMap["BOTTOM"] = false;
  } else if (differenceHorizontal == -1) {
    currentCell.wallMap["BOTTOM"] = false;
    nextCell.wallMap["TOP"] = false;
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
