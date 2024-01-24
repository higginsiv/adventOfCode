console.time();
const fr = require('../../../tools/fileReader');
const events = require('events');
let eventEmitter = new events.EventEmitter();
const ic = require('../common/IntCode.js');
const [year, day, part] = ['2019', '13', '1'];
const [EMPTY, WALL, BLOCK, HOR_PADDLE, BALL] = [0n, 1n, 2n, 3n, 4n];
const [EMPTY_DISP, WALL_DISP, BLOCK_DISP, HOR_PADDLE_DISP, BALL_DISP] = [
    '⬛',
    '◽',
    '🟧',
    '⬜',
    '⚪',
];
const DISPLAY = new Map([
    [EMPTY, EMPTY_DISP],
    [WALL, WALL_DISP],
    [BLOCK, BLOCK_DISP],
    [HOR_PADDLE, HOR_PADDLE_DISP],
    [BALL, BALL_DISP],
]);
const DELIM = '|';
const EVENT_OUTPUT = 'output';
const QUARTERS_INSERTED_POINTER = 0;
const [LEFT, NEUTRAL, RIGHT] = [-1n, 0n, 1n];

eventEmitter.on(EVENT_OUTPUT, receiveInput);

let memory = fr.getInput(year, day, ',').map((x) => BigInt(x));

let score;
let grid = new Map();
let displayGrid = [];
let x, y;
let input = [];
let output = [];
let paddleLoc;
let ballLoc;

memory[QUARTERS_INSERTED_POINTER] = 2n;
ic.runAsync(memory, 0n, input, output, 0n, eventEmitter).then((answer) => {
    console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + score);
    console.log('Expected: 14204');
    console.timeEnd();
});

function receiveInput() {
    if (x == null) {
        x = output.shift();
    } else if (y == null) {
        y = output.shift();
    } else {
        if (displayGrid[y] == null) {
            displayGrid[y] = [];
        }
        if (x === -1n && y === 0n) {
            score = output.shift();
        } else {
            let tile = output.shift();
            if (tile === BALL) {
                ballLoc = x;
                if (ballLoc < paddleLoc) {
                    input.push(LEFT);
                } else if (ballLoc === paddleLoc) {
                    input.push(NEUTRAL);
                } else if (ballLoc > paddleLoc) {
                    input.push(RIGHT);
                } else {
                    input.push(NEUTRAL);
                }
            }
            if (tile === HOR_PADDLE) {
                paddleLoc = x;
            }

            displayGrid[y][x] = DISPLAY.get(tile);

            // Uncomment this to see a (fairly janky) display of the game
            // printGrid();
        }

        x = null;
        y = null;
    }
}

function printGrid() {
    for (let i = 0; i < displayGrid.length; i++) {
        let line = '';
        for (let j = 0; j < displayGrid[i].length; j++) {
            line += displayGrid[i][j];
        }
        console.log(line);
    }
    console.log('');
}
function createKey(row, col) {
    return row + DELIM + col;
}
