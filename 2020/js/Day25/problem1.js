console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","25","1"];
const [DOOR, CARD] = fr.getInput(year,day).map(x => parseInt(x));
const DIVIDEND = 20201227;
const INITIAL_SUBJECT = 7;

let loop = 0;
let value = 1;
while (value !== DOOR) {
	loop++;
	value *= INITIAL_SUBJECT;
	value = value % DIVIDEND;
}

let answer = 1;
while (loop > 0) {
	loop--;
	answer *= CARD;
	answer = answer % DIVIDEND;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();