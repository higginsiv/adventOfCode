console.time();
const fr = require('../../../tools/fileReader');
const events = require('events');
let eventEmitter = new events.EventEmitter();
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","15","1"];
const [NORTH, SOUTH, WEST, EAST] = [1n, 2n, 3n, 4n];
const DIRECTIONS = [NORTH, SOUTH, WEST, EAST];
const [WALL, EMPTY, GOAL] = [0n, 1n, 2n];
const DELIM = '|';
const EVENT_OUTPUT = 'output';

eventEmitter.on(EVENT_OUTPUT, receiveInput);

let memory = fr.getInput(year,day,',').map(x => BigInt(x));

// TODO
// DFS
// move until you can't while keeping track of all moves
// move backwards until you can move again
// move until you can't (ad infinum)
// if you reach goal, record number of steps taken
// when no more options are available, quit and return lowest steps to goal

let grid = new Map();
let locToSteps = new Map();
let dirTriedFromPos = new Map(createKey(0,0), [1n]);

let location = {
    x: 0,
    y: 0
}

let stepsTaken = [1n];
let input = [1n]; 
let output = [];
ic.runAsync(memory, 0n, input, output, 0n, eventEmitter).then(answer => {
    let blocks = [...grid.values()].reduce((total, curr) => {
        if (curr === BLOCK) {
            total++;
        }
        return total;
    }, 0)
    console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + blocks);
    console.log('Expected: ')
    console.timeEnd();
})

function receiveInput() {
    let status = output.shift();

    switch (status) {
        case WALL:
            // increment to position that is not LAST input and is not in dirTried list
            // update map with details
            break;
        case EMPTY:
            // check if steps to reach is lower than previous
                // if no, prune branch and backtrack
                // if yes, continue
            // update location
            let lastDirectionTraveled = stepsTaken[stepsTaken.length - 1];
            updatePosition(lastDirectionTraveled);
            // reset dirTried list
            // update map with details
            grid.set(createKey(location.x, location.y), EMPTY);
            stepsTaken.push(lastDirectionTraveled);
            break;
        case GOAL:
            // update location
            // backtrack to position with choices
            // update dirTried list
            break;
    }
    // make move
}

function createKey(row, col) {
    return row + DELIM + col;
}

function getOpposite(key) {
    switch (key) {
        case NORTH:
            return SOUTH;
        case SOUTH:
            return NORTH;
        case EAST:
            return WEST;
        case WEST:
            return EAST;
    }
}

function updatePosition(dir) {
    switch (key) {
        case NORTH:
            location.x--;
            break;
        case SOUTH:
            location.x++;
            break;
        case EAST:
            location.y++;
            break;
        case WEST:
            location.y--;
            break;
    }
}