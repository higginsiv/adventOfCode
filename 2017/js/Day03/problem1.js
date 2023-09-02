console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2017","03","1"];
const GOAL = fr.getInput(year,day).map(x => parseInt(x))[0];

const INC = 8;
console.log(GOAL)
let steps = 0;
let adder = 4;
let total = 0;

while (total + adder <= GOAL) {
    total += adder;
    adder += INC;
}

console.log(GOAL - total);

let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();