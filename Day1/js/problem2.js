const fr = require('../../tools/fileReader');
const data = fr.getInput(1)
	.map(x => parseInt(x));

let numOfSlidingIncreases = 0;

for (let i = 3; i < data.length; i++) {
	let current = data[i] + data[i-1] + data[i-2];
	let previous = data[i-1] + data[i-2] + data[i-3];

	if (current > previous) {
		numOfSlidingIncreases++
	}
}
console.log('Day 1 Puzzle 2: ' + numOfSlidingIncreases);
