console.time();
const fr = require('../../../tools/fileReader');
const keys = require('../../../tools/keys');

const [year, day, part] = ['2015', '06', '1'];
const [ON, OFF, TOGGLE] = [0, 1, 2];

let lightsOn = new Map();

fr.getInput(year, day).forEach((line) => {
    let instruction;
    line = line.replace(' through ', ' ');
    if (line.includes('turn on')) {
        instruction = ON;
        line = line.substring(8);
    } else if (line.includes('turn off')) {
        instruction = OFF;
        line = line.substring(9);
    } else if (line.includes('toggle')) {
        instruction = TOGGLE;
        line = line.substring(7);
    }

    line = line.split(' ').map((coord) => coord.split(','));

    let x1 = parseInt(line[0][0]);
    let x2 = parseInt(line[1][0]);
    let y1 = parseInt(line[0][1]);
    let y2 = parseInt(line[1][1]);

    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            let key = keys.generateKey(i, j);
            let lightLevel = lightsOn.get(key) == null ? 0 : lightsOn.get(key);
            if (instruction == ON) {
                lightsOn.set(key, lightLevel + 1);
            } else if (instruction == OFF) {
                lightsOn.set(key, lightLevel > 0 ? lightLevel - 1 : 0);
            } else if (instruction == TOGGLE) {
                lightsOn.set(key, lightLevel + 2);
            }
        }
    }
});

let totalLight = 0;
lightsOn.forEach((val) => {
    totalLight += val;
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + totalLight);
console.timeEnd();
