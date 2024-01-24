const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '16', '2'];

const [VERTICAL_SPLITTER, HORIZONTAL_SPLITTER] = ['|', '-'];
const [POSITIVE_REFLECTION, NEGATIVE_REFLECTION] = ['/', '\\'];
const [NORTH, EAST, SOUTH, WEST] = [1, 2, 3, 4];

const DATA = fr.getInput(YEAR, DAY).map((line) => line.split(''));

let startKeys = [];
for (let i = -1; i <= DATA.length; i++) {
  for (let j = -1; j <= DATA[0].length; j++) {
    let directions = [];
    if (i < 0) {
      directions.push(SOUTH);
    }
    if (j < 0) {
      directions.push(EAST);
    }
    if (i >= DATA.length) {
      directions.push(NORTH);
    }
    if (j >= DATA[0].length) {
      directions.push(WEST);
    }

    directions.forEach((direction) => {
      startKeys.push(generateKey(i, j, direction));
    });
  }
}

let answer = startKeys.reduce((total, key) => {
  const [row, column, direction] = key.split(',').map((value) => parseInt(value));

  let startKey = generateKey(row, column, direction);
  let beamVisits = new Set();
  let energized = new Set();

  beamVisits.add(startKey);

  let beamQueue = [startKey];

  while (beamQueue.length > 0) {
    let [row, column, direction] = beamQueue
      .shift()
      .split(',')
      .map((value) => parseInt(value));

    // todo this is inefficient because I am deconstructing and reconstructing the key

    beamVisits.add(generateKey(row, column, direction));

    switch (direction) {
      case NORTH:
        row--;
        break;
      case EAST:
        column++;
        break;
      case SOUTH:
        row++;
        break;
      case WEST:
        column--;
        break;
      default:
        console.log('error');
        break;
    }

    if (row < 0 || column < 0 || row >= DATA.length || column >= DATA[0].length) {
      continue;
    }

    let nextSpace = DATA[row][column];

    switch (nextSpace) {
      case VERTICAL_SPLITTER:
        if (direction === WEST || direction === EAST) {
          addToQueue(row, column, NORTH, beamVisits, beamQueue, energized);
          addToQueue(row, column, SOUTH, beamVisits, beamQueue, energized);
        } else {
          addToQueue(row, column, direction, beamVisits, beamQueue, energized);
        }
        break;
      case HORIZONTAL_SPLITTER:
        if (direction === EAST || direction === WEST) {
          addToQueue(row, column, direction, beamVisits, beamQueue, energized);
        } else {
          addToQueue(row, column, EAST, beamVisits, beamQueue, energized);
          addToQueue(row, column, WEST, beamVisits, beamQueue, energized);
        }
        break;
      case POSITIVE_REFLECTION:
        if (direction === NORTH) {
          direction = EAST;
        } else if (direction === EAST) {
          direction = NORTH;
        } else if (direction === SOUTH) {
          direction = WEST;
        } else if (direction === WEST) {
          direction = SOUTH;
        }
        addToQueue(row, column, direction, beamVisits, beamQueue, energized);
        break;
      case NEGATIVE_REFLECTION:
        if (direction === NORTH) {
          direction = WEST;
        } else if (direction === EAST) {
          direction = SOUTH;
        } else if (direction === SOUTH) {
          direction = EAST;
        } else if (direction === WEST) {
          direction = NORTH;
        }
        addToQueue(row, column, direction, beamVisits, beamQueue, energized);
        break;
      default:
        addToQueue(row, column, direction, beamVisits, beamQueue, energized);
        break;
    }
  }
  let local = energized.size;
  return total > local ? total : local;
}, 0);

function addToQueue(row, column, direction, beamVisits, beamQueue, energized) {
  let key = generateKey(row, column, direction);
  let energizedKey = generateEnergyKey(row, column);
  if (!beamVisits.has(key)) {
    beamVisits.add(key);
    beamQueue.push(key);
  }

  if (!energized.has(energizedKey)) {
    energized.add(energizedKey);
  }
}

function generateKey(row, column, direction) {
  return `${row},${column},${direction}`;
}

function generateEnergyKey(row, column) {
  return `${row},${column}`;
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
