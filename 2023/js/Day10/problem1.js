const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '10', '1'];
let DATA = fr.getInput(YEAR, DAY).map((x) => x.split(''));
const START = 'S';

const [NORTH_SOUTH, EAST_WEST, NORTH_EAST, NORTH_WEST, SOUTH_WEST, SOUTH_EAST, GROUND] = [
  '|',
  '-',
  'L',
  'J',
  '7',
  'F',
  '.',
];
const PIPES = [NORTH_SOUTH, EAST_WEST, NORTH_EAST, NORTH_WEST, SOUTH_WEST, SOUTH_EAST];
let answer;

class State {
  x;
  y;
  pipe;
  visited;
  startPipe;
  constructor(x, y, pipe, visited, startPipe) {
    this.x = x;
    this.y = y;
    this.pipe = pipe;
    this.visited = visited;
    this.startPipe = startPipe;
  }
}

// Create a new row filled with '.' characters
let newRow = new Array(DATA[0].length + 2).fill('.');

// Create a new 2D array with the new rows at the start and end
let newData = [newRow];

// Add the existing rows, with '.' characters at the start and end
for (let row of DATA) {
  newData.push(['.'].concat(row, ['.']));
}

// Add the last new row
newData.push(newRow);

// Replace the old DATA array with the new one
DATA = newData;

let startX;
let startY;

let queue = [];

for (let i = 0; i < DATA.length; i++) {
  let row = DATA[i];
  if (row.includes(START)) {
    startX = i;
    startY = row.indexOf(START);
    PIPES.forEach((pipe) => {
      queue.push(
        new State(i, row.indexOf(START), pipe, [getLocationKey(i, row.indexOf(START))], pipe),
      );
    });
    break;
  }
}

while (queue.length > 0) {
  let state = queue.shift();

  if (state.x === startX && state.y === startY && state.visited.length > 1) {
    answer = Math.floor(state.visited.length / 2);
    break;
  }

  let coordsToLookAt = [];
  let northNeighbor = DATA[state.x - 1][state.y];
  let eastNeighbor = DATA[state.x][state.y + 1];
  let southNeighbor = DATA[state.x + 1][state.y];
  let westNeighbor = DATA[state.x][state.y - 1];

  switch (state.pipe) {
    case NORTH_SOUTH:
      if (
        [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(northNeighbor) ||
        ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) && northNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
      }
      if (
        [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(southNeighbor) ||
        ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) && southNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
      }
      break;
    case EAST_WEST:
      if (
        [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(eastNeighbor) ||
        ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) && eastNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
      }
      if (
        [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(westNeighbor) ||
        ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) && westNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
      }
      break;
    case NORTH_EAST:
      if (
        [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(northNeighbor) ||
        ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) && northNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
      }
      if (
        [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(eastNeighbor) ||
        ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) && eastNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
      }
      break;
    case NORTH_WEST:
      if (
        [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(northNeighbor) ||
        ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) && northNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
      }
      if (
        [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(westNeighbor) ||
        ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) && westNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
      }
      break;
    case SOUTH_WEST:
      if (
        [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(southNeighbor) ||
        ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) && southNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
      }
      if (
        [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(westNeighbor) ||
        ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) && westNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
      }
      break;
    case SOUTH_EAST:
      if (
        [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(southNeighbor) ||
        ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) && southNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
      }
      if (
        [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(eastNeighbor) ||
        ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) && eastNeighbor === START)
      ) {
        coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
      }
      break;
    case GROUND:
      break;
  }

  coordsToLookAt.forEach((coords) => {
    let [x, y] = coords.split('|').map((x) => parseInt(x));

    if (
      !state.visited.includes(coords) ||
      (coords === getLocationKey(startX, startY) && state.visited.length > 2)
    ) {
      let pipe = DATA[x][y];
      let visited = state.visited.slice();
      visited.push(coords);
      queue.push(new State(x, y, pipe, visited, state.startPipe));
    }
  });
}

function getLocationKey(x, y) {
  return `${x}|${y}`;
}

function printGrid() {
  for (let row of DATA) {
    console.log(row.join(''));
  }
  console.log('-------------------');
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
