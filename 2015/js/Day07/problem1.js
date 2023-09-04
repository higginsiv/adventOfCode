console.time();
const fr = require('../../../tools/fileReader');
const keys = require('../../../tools/keys');

const [year, day, part] = ["2015","07","1"];

let gates = new Map();

fr.getInput(year,day).map(x => x.split(' -> ')).forEach(x => {
	gates.set(x[1], x[0]);
});

function traverse(key) {
	// if (!isNaN(key)) {
	// 	return parseInt(key);
	// }

	let input = gates.get(key);
	if (input == null) {
		input = key;
	}
	
	// console.log(key);
	// console.log(input)
	input = input.split(' ');

	if (input.length == 1) {
		if (!isNaN(input[0])) {
			const value = parseInt(input[0]);
			gates.set(key, input[0])
			return value;
		}
		return traverse(input[0]);
	} else if (input.length == 2) {
		return ~traverse(input[1]);
	} else if (input[1] == 'AND'){
		return traverse(input[0]) & traverse(input[2]);
	} else if (input[1] == 'OR'){
		return traverse(input[0]) | traverse(input[2]);
	} else if (input[1] == 'LSHIFT'){
		return traverse(input[0]) << traverse(input[2]);
	} else if (input[1] == 'RSHIFT'){
		return traverse(input[0]) >> traverse(input[2]);
	} else {
		console.log('error parsing instruction: ' + input)
	}
}

let answer = traverse('a');
if (answer < 0) {
	answer += 65536;
}
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();