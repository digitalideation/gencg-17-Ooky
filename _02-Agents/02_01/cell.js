class Cell {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.wallMap = {
      TOP: true,
      RIGHT: true,
      BOTTOM: true,
      LEFT: true,
    }

  }

  drawGrid() {
    stroke(colorWalls);
    let positionX = this.x * squareSize;
    let positionY = this.y * squareSize;
    //----------------------Corners----------------------------------
    //TOP    - LEFT : ( positionX            , positionY            )
    //TOP    - RIGHT: ( positionX+squareSize , positionY            )
    //BOTTOM - RIGHT: ( positionX+squareSize , positionY+squareSize )
    //BOTTOM - LEFT : ( positionX            , positionY+squareSize )
    //---------------------------------------------------------------

    //From: TopLeft to TopRight
    if (this.wallMap["TOP"]) {
      line(positionX, positionY, positionX + squareSize, positionY);
    }
    //From: TopRight to BottomRight
    if (this.wallMap["RIGHT"]) {
      //right wall fix
      if ((this.x + 1) % (columns) != 0) {
        line(positionX + squareSize, positionY, positionX + squareSize, positionY + squareSize);
      } else {
        line(positionX + squareSize - 1, positionY, positionX + squareSize - 1, positionY + squareSize);
      }
    }
    //From: BottomRight to BottomLeft
    if (this.wallMap["BOTTOM"]) {
      //bottom wall fix
      if ((this.y + 1) % (rows) != 0) {
        line(positionX + squareSize, positionY + squareSize, positionX, positionY + squareSize);
      } else {
        line(positionX + squareSize, positionY + squareSize - 1, positionX, positionY + squareSize - 1);
      }
    }
    //From: BottomLeft to TopLeft
    if (this.wallMap["LEFT"]) {
      line(positionX, positionY + squareSize, positionX, positionY);
    }
    if (this.visited) {
      noStroke();
      fill(colorVisited);
      rect(positionX, positionY, squareSize, squareSize);
    }
  } //drawGrid() {

  highlight() {
    let positionX = this.x * squareSize;
    let positionY = this.y * squareSize;
    noStroke();
    fill(colorHighlight);
    rect(positionX, positionY, squareSize, squareSize);
  } //  highlight () {

  getRandomNextNeighbourCell() {
    let neighbourCells = [];
    let top, right, bottom, left;
    top = right = bottom = left = null;
    //--------------------------------------------------------------
    //TOP    : (x  , y-1)
    //RIGHT  : (x+1, y  )
    //BOTTOM : (x  , y+1)
    //LEFT   : (x-1, y  )
    //--------------------------------------------------------------
    //Define top right bottom left
    if (this.getIndex(this.x, this.y - 1) > -1) {
      top = cells[this.getIndex(this.x, this.y - 1)];
    }
    if (this.getIndex(this.x + 1, this.y) > -1) {
      right = cells[this.getIndex(this.x + 1, this.y)];
    }
    if (this.getIndex(this.x, this.y + 1) > -1) {
      bottom = cells[this.getIndex(this.x, this.y + 1)];
    }
    if (this.getIndex(this.x - 1, this.y) > -1) {
      left = cells[this.getIndex(this.x - 1, this.y)];
    }

    //Add to neighbourCells
    if (top != null && !top.visited) {
      neighbourCells.push(top);
    }
    if (right != null && !right.visited) {
      neighbourCells.push(right);
    }
    if (bottom != null && !bottom.visited) {
      neighbourCells.push(bottom);
    }
    if (left != null && !left.visited) {
      neighbourCells.push(left);
    }

    if (neighbourCells.length > 0) {
      let randomCell = floor(random(0, neighbourCells.length));
      return neighbourCells[randomCell];
    } else {
      return null;
    }
  }

  getIndex(x, y) {
    //Edgecases: TOP, RIGHT, BOTTOM, LEFT
    if (y < 0 || x > (columns - 1) || y > (rows - 1) || x < 0) {
      return -1;
    }
    return x + y * columns;
  }
}
