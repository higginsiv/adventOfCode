const fs = require('fs');
const inputArray = fs
	.readFileSync("./js/Day1/input.txt")
	.toString()
	.split('\n');

let numOfSlidingIncreases = 0;

for (let i = 3; i < inputArray.length; i++) {
	let current = parseInt(inputArray[i]) + parseInt(inputArray[i-1]) + parseInt(inputArray[i-2]);
	let previous = parseInt(inputArray[i-1]) + parseInt(inputArray[i-2]) + parseInt(inputArray[i-3]);

	if (current > previous) {
		numOfSlidingIncreases++
	}
}
console.log('Day 1 Puzzle 2: ' + numOfSlidingIncreases);
