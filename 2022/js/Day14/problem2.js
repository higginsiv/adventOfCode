const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "14", "1"];
const data = fr
  .getInput(year, day)
  .map((x) => x.split(" -> ").map((x) => x.split(",").map((x) => parseInt(x))));
const ROCK = "#";
const SAND = "O";
const MORE = 1;
const VOID = 0;
const CLOGGED = -1;
const sandSource = [500, 0];

let cave = [];
let highestRock = 0;
let sandFallen = 0;

data.forEach((path) => {
  for (let i = 0; i < path.length - 1; i++) {
    let [p1x, p1y] = path[i];
    let [p2x, p2y] = path[i + 1];

    let [lowx, highx] = [p1x, p2x].sort((a, b) => a - b);
    let [lowy, highy] = [p1y, p2y].sort((a, b) => a - b);

    if (highy > highestRock) {
      highestRock = highy;
    }

    if (p1x === p2x) {
      // vertical line
      for (let y = lowy; y <= highy; y++) {
        if (cave[y] == null) {
          cave[y] = [];
        }
        cave[y][p1x] = ROCK;
      }
    } else {
      // horizontal line
      for (let x = lowx; x <= highx; x++) {
        if (cave[p1y] == null) {
          cave[p1y] = [];
        }
        cave[p1y][x] = ROCK;
      }
    }
  }
});

highestRock += 2;

function sandFall(x, y) {
  if (isEmpty(x, y + 1)) {
    return sandFall(x, y + 1);
  } else if (isEmpty(x - 1, y + 1)) {
    return sandFall(x - 1, y + 1);
  } else if (isEmpty(x + 1, y + 1)) {
    return sandFall(x + 1, y + 1);
  } else {
    sandFallen++;
    if (cave[y] == null) {
        cave[y] = [];
    }
    cave[y][x] = SAND;
    if (x === sandSource[0] && y === sandSource[1]) {
        return CLOGGED;
    }
    return MORE;
  }
}

function isEmpty(x, y) {
  if (cave[y] == null) {
    cave[y] = [];
  }

  return y < highestRock && cave[y][x] !== ROCK && cave[y][x] !== SAND;
}

function dropSand() {
  while (true) {
    let status = sandFall(500, 0);
    if (status === VOID || status === CLOGGED) {
      break;
    }
  }
}

function printCave() {
  for (let i = 0; i < highestRock + 3; i++) {
    if (cave[i] == null) {
      cave[i] = [];
    }
    let tolog = "";
    for (let j = 425; j < 550; j++) {
      if (cave[i][j] == null) {
        cave[i][j] = ".";
      }
      tolog += cave[i][j];
    }
    console.log(tolog);
  }
}

dropSand();
// printCave();
let answer = sandFallen;
console.log("Year " + year + " Day " + day + " Puzzle " + part + ": " + answer);
