const fr = require('../../tools/fileReader');
const data = fr.getInput(1)
	.map(x => parseInt(x));

let numOfIncreases = 0;

for (let i = 1; i < data.length; i++) {
	let current = data[i];
	let previous = data[i-1];

	if (current > previous) {
		numOfIncreases++
	}
}
console.log('Day 1 Puzzle 1: ' + numOfIncreases);