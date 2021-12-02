const fr = require('../tools/fileReader');
const data = fr.getInput(1);

let numOfSlidingIncreases = 0;

for (let i = 3; i < data.length; i++) {
	let current = parseInt(data[i]) + parseInt(data[i-1]) + parseInt(data[i-2]);
	let previous = parseInt(data[i-1]) + parseInt(data[i-2]) + parseInt(data[i-3]);

	if (current > previous) {
		numOfSlidingIncreases++
	}
}
console.log('Day 1 Puzzle 2: ' + numOfSlidingIncreases);
