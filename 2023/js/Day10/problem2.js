const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '10', '2'];
let DATA = fr.getInput(YEAR, DAY).map((x) => x.split(''));
const START = 'S';
const EXPANDER = '*';

const [
    NORTH_SOUTH,
    EAST_WEST,
    NORTH_EAST,
    NORTH_WEST,
    SOUTH_WEST,
    SOUTH_EAST,
    GROUND,
] = ['|', '-', 'L', 'J', '7', 'F', '.'];
const PIPES = [
    NORTH_SOUTH,
    EAST_WEST,
    NORTH_EAST,
    NORTH_WEST,
    SOUTH_WEST,
    SOUTH_EAST,
];
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
        PIPES.forEach(pipe => {
        queue.push(
            new State(
                i,
                row.indexOf(START),
                pipe,
                [getLocationKey(i, row.indexOf(START))],
                pipe
            )
        );
        });
        break;
    }
}

printGrid(DATA);

let loop;
let startTile;
while (queue.length > 0) {
    let state = queue.shift();

    if (state.x === startX && state.y === startY && state.visited.length > 1) {
        loop = state.visited;
        startTile = state.startPipe;
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
                ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(
                    state.startPipe
                ) &&
                    northNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
            }
            if (
                [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(
                    southNeighbor
                ) || ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) && southNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
            }
            break;
        case EAST_WEST:
            if (
                [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(
                    eastNeighbor
                ) || ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) && eastNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
            }
            if (
                [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(
                    westNeighbor
                ) || ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) && westNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
            }
            break;
        case NORTH_EAST:
            if (
                [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(
                    northNeighbor
                ) || ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) && northNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
            }
            if (
                [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(
                    eastNeighbor
                ) || ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) && eastNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x, state.y + 1));
            }
            break;
        case NORTH_WEST:
            if (
                [NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(
                    northNeighbor
                )   || ([NORTH_SOUTH, SOUTH_EAST, SOUTH_WEST].includes(state.startPipe) && northNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x - 1, state.y));
            }
            if (
                [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(
                    westNeighbor
                ) || ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) && westNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
            }
            break;
        case SOUTH_WEST:
            if (
                [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(
                    southNeighbor
                ) || ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) && southNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
            }
            if (
                [EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(
                    westNeighbor
                )   || ([EAST_WEST, NORTH_EAST, SOUTH_EAST].includes(state.startPipe) && westNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x, state.y - 1));
            }
            break;
        case SOUTH_EAST:
            if (
                [NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(
                    southNeighbor
                ) || ([NORTH_SOUTH, NORTH_EAST, NORTH_WEST].includes(state.startPipe) && southNeighbor === START)
            ) {
                coordsToLookAt.push(getLocationKey(state.x + 1, state.y));
            }
            if (
                [EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(
                    eastNeighbor
                )   || ([EAST_WEST, NORTH_WEST, SOUTH_WEST].includes(state.startPipe) && eastNeighbor === START)
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
            (coords === getLocationKey(startX, startY) &&
                state.visited.length > 2)
        ) {
            let pipe = DATA[x][y];
            let visited = state.visited.slice();
            visited.push(coords);
            queue.push(new State(x, y, pipe, visited, state.startPipe));
        }
    });
}

// Make newGrid big

let newGrid = DATA;
let symbol = '.'; 

let newArray = Array.from({ length: newGrid.length * 3 }, () => Array(newGrid[0].length * 3).fill(symbol));

newGrid = newArray;

// end make newGrid big
printGrid(newGrid);

let offsetX = DATA.length;
let offsetY = DATA[0].length;

let x = startX + offsetX;
let y = startY + offsetY;
let addedPoints = new Set();
let badColumns = new Set();
let badRows = new Set();

loop.pop();
console.log(loop);
// TODO get rid of loop on newGrid
printGrid(newGrid);
loop.forEach((coords, index) => {
    let [origX, origY] = coords.split('|').map((x) => parseInt(x));

    // console.log(`origX: ${origX} origY: ${origY}`);
    // console.log(`${loop[index - 1]}`);
    if (index !== 0) {
        x += (2*(origX - parseInt(loop[index - 1].split('|')[0])));
        y += (2*(origY - parseInt(loop[index - 1].split('|')[1])));
    }

    let pipe = DATA[origX][origY];

    if (pipe === START) {
        pipe = startTile;
    }

    // console.log(`x: ${x} y: ${y}`);
    // console.log();
    newGrid[x][y] = pipe;

    // todo better system for tracking bad rows/columns as the grid changes sizes
    if (pipe === NORTH_SOUTH) {
        badRows.add(x - 1);
        badRows.add(x + 1);
        addedPoints.add(getLocationKey(x - 1, y));
        addedPoints.add(getLocationKey(x + 1, y));
        newGrid[x - 1][y] = pipe;
        newGrid[x + 1][y] = pipe;
    } else if (pipe === EAST_WEST) {
        badColumns.add(y - 1);
        badColumns.add(y + 1);
        addedPoints.add(getLocationKey(x, y - 1));
        addedPoints.add(getLocationKey(x, y + 1)); 
        newGrid[x][y - 1] = pipe;
        newGrid[x][y + 1] = pipe;
    } else if (pipe === NORTH_EAST) {
        badColumns.add(y + 1);
        badRows.add(x - 1);
        addedPoints.add(getLocationKey(x - 1, y));
        addedPoints.add(getLocationKey(x, y + 1));
        newGrid[x - 1][y] = NORTH_SOUTH;
        newGrid[x][y + 1] = EAST_WEST;
    } else if (pipe === NORTH_WEST) {
        badColumns.add(y - 1);
        badRows.add(x - 1);
        addedPoints.add(getLocationKey(x - 1, y));
        addedPoints.add(getLocationKey(x, y - 1));
        newGrid[x - 1][y] = NORTH_SOUTH;
        newGrid[x][y - 1] = EAST_WEST;
    } else if (pipe === SOUTH_WEST) {
        badColumns.add(y - 1);
        badRows.add(x + 1);
        addedPoints.add(getLocationKey(x + 1, y));
        addedPoints.add(getLocationKey(x, y - 1));
        newGrid[x + 1][y] = NORTH_SOUTH;
        newGrid[x][y - 1] = EAST_WEST;
    } else if (pipe === SOUTH_EAST) {
        badColumns.add(y + 1);
        badRows.add(x + 1);
        addedPoints.add(getLocationKey(x, y + 1));
        addedPoints.add(getLocationKey(x + 1, y));
        newGrid[x + 1][y] = NORTH_SOUTH;;
        newGrid[x][y + 1] = EAST_WEST;
    } 

});

newGrid.push(new Array(newGrid[0].length).fill('.'))

let floodX = newGrid.length - 1;
let floodY = newGrid[0].length - 1;

let visited = new Set();
let area = 0;

function floodFill(startX, startY) {
    let queue = [[startX, startY]];

    while (queue.length > 0) {
        let [x, y] = queue.shift();

        if (x < 0 || y < 0 || x >= newGrid.length || y >= newGrid[0].length) continue;

        let locationKey = getLocationKey(x, y);
        if (PIPES.includes(newGrid[x][y]) || visited.has(locationKey)) continue;

        visited.add(locationKey);
        newGrid[x][y] = EXPANDER;
        area++;

        queue.push([x - 1, y]);
        queue.push([x + 1, y]);
        queue.push([x, y - 1]);
        queue.push([x, y + 1]);
    }
}


// Start flood fill from a point known to be inside the shape
floodFill(floodX, floodY);

printGrid(newGrid);
console.log()
let ans = 0;
for (let i = 0; i < newGrid.length; i++) {
    let row = newGrid[i];
    for (let j = 0; j < row.length; j++) {
        if (row[j] === GROUND && !badRows.has(i) && !badColumns.has(j)) {
            ans++;
        }
    }
}

console.log(area);
console.log(newGrid.length * newGrid[0].length);
console.log(loop.length);
console.log(addedPoints.size);
// have to subtract one from loop because start is on there twice right now
console.log((newGrid.length * newGrid[0].length) - area - ((loop.length - 1) * 2));
console.log(ans);

// area of grid - number of loop tiles - extra tiles I added
function getLocationKey(x, y) {
    return `${x}|${y}`;
}

function printGrid(grid) {
    for (let row of grid) {
        console.log(row.join(''));
    }
    console.log('-------------------');
}

answer = ans;
// I know the area of the expanded loop
// I know the tilespace of the reduced loop
// area - tilespace
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
