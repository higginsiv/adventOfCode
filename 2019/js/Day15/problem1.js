console.time();
const fr = require('../../../tools/fileReader');
const events = require('events');
let eventEmitter = new events.EventEmitter();
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","15","1"];
const [NORTH, SOUTH, WEST, EAST] = [1n, 2n, 3n, 4n];
const DIRECTIONS = [NORTH, SOUTH, WEST, EAST];
const NO_MOVES = 'nahbro'
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
locToSteps.set(createKey(0,0), 0)
let stepsToGoal = Infinity;

let location = {
    x: 0,
    y: 0
}

let stepsTaken = [1n];
let input = [1n]; 
let output = [];
ic.runAsync(memory, 0n, input, output, 0n, eventEmitter).then(answer => {
    console.log('dead')
})

function receiveInput() {
    let status = output.shift();
    console.log('status: ' + status)
    let nextMove;
    let lastDirectionTraveled;
    switch (status) {
        case WALL:
            lastDirectionTraveled = stepsTaken[stepsTaken.length - 1];
            updatePosition(lastDirectionTraveled);
            grid.set(createKey(location.x, location.y), WALL);
            updatePosition(getOpposite(lastDirectionTraveled));
            stepsTaken.pop();
            break;
        case EMPTY:
            lastDirectionTraveled = stepsTaken[stepsTaken.length - 1];
            updatePosition(lastDirectionTraveled);
            locToSteps.set(createKey(location.x, location.y), stepsTaken.length);
  
            grid.set(createKey(location.x, location.y), EMPTY);
            // console.log(location)

            break;
        case GOAL:
            lastDirectionTraveled = stepsTaken[stepsTaken.length - 1];
            updatePosition(lastDirectionTraveled);
            stepsToGoal = stepsToGoal > stepsTaken.length ? stepsTaken.length : stepsToGoal;
            locToSteps.set(createKey(location.x, location.y), stepsTaken.length);
            grid.set(createKey(location.x, location.y), GOAL);

            updatePosition(getOpposite(lastDirectionTraveled));
            stepsTaken.pop();
            console.log('g: ' + stepsToGoal)
            break;
        default:
            console.log('Invalid Status');
    }

    nextMove = pickNextMove();
    // console.log('next: ' + nextMove)
    // todo bail out if total steps > goal steps
    if (nextMove === NO_MOVES) {
        console.log(stepsTaken.length)
        if (stepsTaken.length === 0) {
            console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + blocks);
            console.log('Expected: ')
            console.timeEnd();
            process.exit();
        } else {
            input.push(getOpposite(stepsTaken.pop()));
        }
    } else {
        stepsTaken.push(nextMove)
        input.push(nextMove);
    }
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
        default:
            console.log('Invalid Opposite: ' + key)
    }
}

function updatePosition(dir) {
    switch (dir) {
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
        default:
            console.log('Invalid update: ' + dir)
    }
    // console.log(location)
}

function pickNextMove() {
    let northKey = createKey(location.x - 1, location.y);
    let southKey = createKey(location.x + 1, location.y);
    let westKey = createKey(location.x, location.y - 1);
    let eastKey = createKey(location.x, location.y + 1);

    let keys = [northKey, southKey, westKey, eastKey];

    for (let i = 0; i < keys.length; i++) {
        let tile = grid.get(keys[i]);
        // console.log('tile next move: ' + tile)
        if (tile === WALL) {
            continue;
        }
        if (locToSteps.get(keys[i]) <= stepsTaken.length + 1) {
            continue
        }
        return BigInt(i + 1);
    } 

    return NO_MOVES;
}