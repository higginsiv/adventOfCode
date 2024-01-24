console.time();
const fr = require('../../../tools/fileReader');
const { EOL } = require('os');
const { exit } = require('process');
const [year, day, part] = ['2020', '16', '1'];

class Range {
    min;
    max;
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

let [KEY_INFO, YOUR_TICKET, TICKETS] = fr.getInput(year, day, EOL + EOL);

let keys = new Map();
let keyNames = [];
KEY_INFO.split(EOL).forEach((x) => {
    let name = x.substring(0, x.indexOf(':'));
    let rangesString = x.substring(x.indexOf(':') + 2);
    let ranges = rangesString.split(' or ').map((r) => {
        r = r.split('-').map((y) => parseInt(y));
        return new Range(...r);
    });
    keys.set(name, ranges);
    keyNames.push(name);
});

let possibleKeys = new Array(keyNames.length);
for (let i = 0; i < possibleKeys.length; i++) {
    possibleKeys[i] = keyNames.slice();
}

TICKETS = TICKETS.split(EOL).map((t) => {
    t = t.split(',').map((x) => parseInt(x));
    return t;
});
// REALLY lazy parsing (removing the 'nearby tickets:' line)
TICKETS.shift();
let invalidSum = 0;

TICKETS.forEach((ticket, u) => {
    ticket.forEach((field, index) => {
        let globalInRange = false;
        for (let i = possibleKeys[index].length - 1; i >= 0; i--) {
            if (possibleKeys[index] != null) {
                let ranges = keys.get(possibleKeys[index][i]);
                for (let j = 0; j < ranges.length; j++) {
                    let min = ranges[j].min;
                    let max = ranges[j].max;
                    if (field >= min && field <= max) {
                        globalInRange = true;
                    }
                }
            }
        }
        if (!globalInRange) {
            invalidSum += field;
        }
    });
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + invalidSum);
console.timeEnd();
