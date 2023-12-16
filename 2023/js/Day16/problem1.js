const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","16","1"];

const [VERTICAL_SPLITTER, HORIZONTAL_SPLITTER] = ["|", "-"];
const [POSITIVE_REFLECTION, NEGATIVE_REFLECTION] = ["/", "\\"];
const [NORTH, EAST, SOUTH, WEST] = [1, 2, 3, 4];

const DATA = fr.getInput(YEAR,DAY).map(line => line.split(''));

let startKey = generateKey(0, -1, EAST);
let startEnergizedKey = generateEnergyKey(0, 0);
let beamVisits = new Set();
let energized = new Set();

beamVisits.add(startKey);
energized.add(startEnergizedKey);

let beamQueue = [startKey];

while (beamQueue.length > 0) {
    let [row, column, direction] = beamQueue.shift().split(',').map(value => parseInt(value));

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
                addToQueue(row, column, NORTH);
                addToQueue(row, column, SOUTH);
            } else {
                addToQueue(row, column, direction);
            }
            break;
        case HORIZONTAL_SPLITTER:
            if (direction === EAST || direction === WEST) {
                addToQueue(row, column, direction);
            } else {
                addToQueue(row, column, EAST);
                addToQueue(row, column, WEST);
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
            addToQueue(row, column, direction);
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
            addToQueue(row, column, direction);
            break;
        default:
            addToQueue(row, column, direction);
            break;
    }
}

function addToQueue(row, column, direction) {
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

energized.forEach(key => {
    let [row, column] = key.split(',').map(value => parseInt(value));
    DATA[row][column] = 'O';
});

let answer = energized.size;

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);