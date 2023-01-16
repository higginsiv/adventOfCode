console.time();
const fr = require('../../../tools/fileReader');
const events = require('events');
let eventEmitter = new events.EventEmitter();
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","13","1"];
const [EMPTY, WALL, BLOCK, HOR_PADDLE, BALL] = [0n, 1n, 2n, 3n, 4n];
const DELIM = '|';
const EVENT_OUTPUT = 'output';

eventEmitter.on(EVENT_OUTPUT, receiveInput);

let memory = fr.getInput(year,day,',').map(x => BigInt(x));

let grid = new Map();
let x,y;
let input = []; 
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
    if (x == null) {
        x = output.shift();
    } else if (y == null) {
        y = output.shift();
    } else {
        grid.set(createKey(x, y), output.shift())
        x = null;
        y = null;
    }
}

function createKey(row, col) {
    return row + DELIM + col;
}