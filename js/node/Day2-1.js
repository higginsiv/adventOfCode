const fs = require('fs');
const data = fs
	.readFileSync("./inputs/Day2.txt")
	.toString()
	.split('\n');

console.log(data);