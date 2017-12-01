class Cell {

  constructor(x, y) {
     this.x = x;
     this.y = y;
     this.wallMap =  {
       TOP: true,
       RIGHT: true,
       BOTTOM: true,
       LEFT: true,
     }

  }

   drawGrid() {
    stroke(colorWalls);
  }

}
