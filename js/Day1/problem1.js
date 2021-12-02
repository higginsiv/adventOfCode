const fs = require('fs');
const inputArray = fs
	.readFileSync("./js/Day1/input.txt")
	.toString()
	.split('\n');

let numOfIncreases = 0;

for (let i=1; i < inputArray.length; i++) {
	let current = parseInt(inputArray[i]);
	let previous = parseInt(inputArray[i-1]);

	if (current > previous) {
		numOfIncreases++
	}
}
console.log('Day 1 Puzzle 1: ' + numOfIncreases);