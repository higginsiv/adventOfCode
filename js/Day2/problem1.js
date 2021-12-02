const fs = require('fs');
const data = fs
	.readFileSync("./js/Day2/input.txt")
	.toString()
	.split('\n');

let horizontal = 0;
let depth = 0;

data.forEach(function(element) {
	let movement = element.split(' ');
	if (movement[0] === 'forward') {
		horizontal += parseInt(movement[1]);
	} else if (movement[0] === 'down') {
		depth += parseInt(movement[1]);
	} else if (movement[0] === 'up') {
		depth -= parseInt(movement[1]);
	}
});
console.log(horizontal);
console.log(depth);
console.log(horizontal*depth);
