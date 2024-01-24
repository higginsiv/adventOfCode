console.time();
const fr = require('../../../tools/fileReader');
const events = require('events');
let eventEmitter = new events.EventEmitter();
const ic = require('../common/IntCode.js');
const [year, day, part] = ['2019', '11', '1'];
const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];
const data = fr.getInput(year, day, ',').map((x) => BigInt(x));
const DELIM = '|';
const [BLACK, WHITE] = [0n, 1n];
const [RIGHT, LEFT] = [1n, 0n];
const [PAINT, MOVE] = [1, -1];

const EVENT_OUTPUT = 'output';

eventEmitter.on(EVENT_OUTPUT, receiveInput);

let grid = new Map();
class Robot {
    row;
    col;
    dir;
    output;
    input;
    nextInstruction = PAINT;
    constructor(row, col, dir, output, input) {
        this.row = row;
        this.col = col;
        this.dir = dir;
        this.output = output;
        this.input = input;
    }
}

let rob = new Robot(0, 0, NORTH, [BLACK], []);

ic.runAsync(data, 0n, rob.output, rob.input, 0n, eventEmitter).then((answer) => {
    console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + grid.size);
    console.log('Expected: 2064');
    console.timeEnd();
});

function receiveInput() {
    switch (rob.nextInstruction) {
        case PAINT:
            paintSquare();
            break;
        case MOVE:
            turnRobot();
            break;
    }
    rob.nextInstruction *= -1;
}

function paintSquare() {
    let color = rob.input.shift();
    grid.set(createKey(rob.row, rob.col), color);
}

function turnRobot() {
    let dir = rob.input.shift();
    switch (dir) {
        case RIGHT:
            rob.dir = (rob.dir + 1) % 4;
            break;
        case LEFT:
            let val = rob.dir - 1;
            if (val < NORTH) {
                val = WEST;
            }
            rob.dir = val;
            break;
        default:
            console.log('Invalid Turn: ' + dir);
    }
    moveRobot();
    readSquare();
}

function moveRobot() {
    switch (rob.dir) {
        case NORTH:
            rob.row -= 1;
            break;
        case EAST:
            rob.col += 1;
            break;
        case SOUTH:
            rob.row += 1;
            break;
        case WEST:
            rob.col -= 1;
            break;
    }
}

function readSquare() {
    let color = grid.get(createKey(rob.row, rob.col));
    if (color == null) {
        color = BLACK;
    }
    rob.output.push(color);
}

function createKey(row, col) {
    return row + DELIM + col;
}
