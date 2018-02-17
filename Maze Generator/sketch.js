let cols, rows;
let w = 50;
let grid = [];
let current;
let stack = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / w);
  rows = floor(height / w);

  frameRate(5);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = new Cell(x, y);
      grid.push(cell);
    }
  }

  current = grid[0];

}

function draw() {
  background(51);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function removeWalls(current, next) {
  let x = current.x - next.x;
  current.walls[3] = false;
  if (x === 1) {
    next.walls[1] = false;
  } else if (x === -1) {
    current.walls[1] = false;
    next.walls[3] = false;
  }

  let y = current.y - next.y;
  if (y === 1) {
    current.walls[0] = false;
    next.walls[2] = false;
  } else if (y === -1) {
    current.walls[2] = false;
    next.walls[0] = false;
  }
}