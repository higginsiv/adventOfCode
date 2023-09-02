console.time();
const fr = require('../../../tools/fileReader');

const [year, day, part] = ["2015","05","1"];

const VOWELS = ['a','e','i','o','u'];

let numNiceStrings = 0;
const data = fr.getInput(year,day).forEach(x => {
	let letters = x.split('');

	let hasSandwich = false;
	let hasDoublePair = false;

	for (let i = 0; i < letters.length; i++) {
		if (!hasSandwich && i < letters.length - 2 && letters[i] == letters[i + 2]) {
			hasSandwich = true;
		}

		if (!hasDoublePair && i > 0) {
			let potentialDouble = letters[i-1] + letters[i];
			if (x.lastIndexOf(potentialDouble) > i) {
				hasDoublePair = true;
			}
		}

		if (hasSandwich && hasDoublePair) {
			numNiceStrings++;
			break;
		}
	}
});


console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + numNiceStrings);
console.timeEnd();