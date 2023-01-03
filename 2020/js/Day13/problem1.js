console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","13","1"];
const data = fr.getInput(year,day);

const EARLIEST = parseInt(data[0]);

let bestId;
let bestWaitTime = Infinity;
let trains = data[1].split(',');
trains.forEach(x => {
    if (x !== 'x') {
        x = parseInt(x);
        let timeToWait = x - (EARLIEST % x);
        if (bestWaitTime > timeToWait) {
            bestWaitTime = timeToWait;
            bestId = x;
        }
    }
});

let answer = bestId * bestWaitTime;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();