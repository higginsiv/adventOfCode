const fr = require('../../../tools/fileReader');
const data = fr.getInput("2021","03");

let oxygen = data;
let iteration = 0;
while (oxygen.length > 1) {
	let digitCounter = getDigitCounts(oxygen);
	let comparisonDigit = digitCounter[iteration].numOne === digitCounter[iteration].numZero
		|| digitCounter[iteration].numOne > digitCounter[iteration].numZero ? 1 : 0;

	oxygen = oxygen.filter(binaryString => binaryString[iteration] == comparisonDigit);
	iteration++;
}

let carbon = data;
iteration = 0;

while (oxygen.length > 1 || carbon.length > 1) {
	if (oxygen.length > 1) {
		let oxDigitCounter = getDigitCounts(oxygen);
		let comparisonDigit = oxDigitCounter[iteration].numOne === oxDigitCounter[iteration].numZero
		|| oxDigitCounter[iteration].numOne > oxDigitCounter[iteration].numZero ? 1 : 0;

		oxygen = oxygen.filter(binaryString => binaryString[iteration] == comparisonDigit);
	}

	if (carbon.length > 1) {
		let coDigitCounter = getDigitCounts(carbon);
		let comparisonDigit = coDigitCounter[iteration].numOne === coDigitCounter[iteration].numZero
		|| coDigitCounter[iteration].numOne > coDigitCounter[iteration].numZero ? 0 : 1;
		carbon = carbon.filter(binaryString => binaryString[iteration] == comparisonDigit);
	}
	iteration++;
}

let oxygenDecimal = parseInt(oxygen, 2);
let carbonDecimal = parseInt(carbon, 2);

console.log('Day 3 Puzzle 2: ' + oxygenDecimal * carbonDecimal);

function getDigitCounts(data) {
	let digitCounter = [];
	data.forEach(binaryString => {
		binaryString.split("")
			.forEach((digit, index) => {
				if (digitCounter[index] == null) {
					digitCounter[index] = {
						numZero: 0,
						numOne: 0
					};
				}
				if (digit === '0') {
					digitCounter[index].numZero++;
				} else {
					digitCounter[index].numOne++;
				}
			});
	});

	return digitCounter;
}