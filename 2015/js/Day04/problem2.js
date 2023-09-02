console.time();
const fr = require('../../../tools/fileReader');
const crypto = require('crypto');

const [year, day, part] = ["2015","04","2"];
const START_GOAL = '000000';

const input = fr.getInput(year,day)[0];

let num = 0;

while (true) {
	let hashed = crypto.createHash('md5').update(input + num).digest('hex');

	if (hashed.startsWith(START_GOAL)) {
		break;
	}
	num++;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + num);
console.timeEnd();