const fr = require('../tools/fileReader');
const data = fr.getInput(3);

let gamma = [];
let epsilon = [];
let digitCounter = []

data.forEach(function(x) {
	let digits = x.split("");
	digits.forEach(function(y, index) {
		if (digitCounter[index] == null) {
			digitCounter[index] = {
				numZero: 0,
				numOne: 0
			};
		}
		if (y === '0') {
			digitCounter[index].numZero++;
		} else {
			digitCounter[index].numOne++;
		}
	});
});

digitCounter.forEach(function(x, index) {
	gamma[index] = digitCounter[index].numZero > digitCounter[index].numOne ? 0 : 1;
	epsilon[index] = (gamma[index] * -1) + 1;
})

let gammaDecimal = parseInt(gamma.join(''), 2);
let epsilonDecimal = parseInt(epsilon.join(''), 2);
console.log('Day 3 Puzzle 1: ' + gammaDecimal * epsilonDecimal);