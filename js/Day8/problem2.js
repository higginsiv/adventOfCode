const fr = require('../tools/fileReader');
const data = fr.getInput(8, '\n', 'input.txt');

let input = [];
let output = [];

data.forEach(x => {
	const entry = x.split(' | ');
	input.push(entry[0]);
	output.push(entry[1]);
});

let sumOutput = 0;

input.forEach((x, index) => {
	let solved = false;
	let skip2 = true;
	let solvedDigits = [];

	let digits = x.split(' ');

	while (!solved) {
		digits.forEach(digit => {
			if (!solvedDigits[1] && digit.length === 2) {
				solvedDigits[1] = digit.split('');
			} else if (!solvedDigits[4] && digit.length === 4) {
				solvedDigits[4] = digit.split('');
			} else if (!solvedDigits[7] && digit.length === 3) {
				solvedDigits[7] = digit.split('');
			} else if (!solvedDigits[8] && digit.length === 7) {
				solvedDigits[8] = digit.split('');
			} else if (!solvedDigits[3] && digit.length === 5 && solvedDigits[1] && solvedDigits[1].every(x => digit.includes(x))) {
				solvedDigits[3] = digit.split('');
			} else if (!solvedDigits[9] && digit.length === 6 && solvedDigits[3] && solvedDigits[3].every(x => digit.includes(x))) {
				solvedDigits[9] = digit.split('');
			} else if (!solvedDigits[0] && digit.length === 6 && solvedDigits[3]
				&& !solvedDigits[3].every(x => digit.includes(x)) && solvedDigits[1]
				&& solvedDigits[1].every(x => digit.includes(x))) {
				solvedDigits[0] = digit.split('');
			} else if (!solvedDigits[6] && digit.length === 6 && solvedDigits[0] && solvedDigits[9]) {
				let temp = digit.split('');
				if (JSON.stringify(solvedDigits[9]) != JSON.stringify(temp) && JSON.stringify(solvedDigits[0]) != JSON.stringify(temp)) {
					// we've solved the other 6 segment digits
					solvedDigits[6] = temp;
				}
			} else if (!solvedDigits[5] && solvedDigits[9] && digit.length === 5) {
				if (JSON.stringify(solvedDigits[3]) != JSON.stringify(digit.split(''))) {
					let temp = digit.split('');
					let dif = solvedDigits[9].filter(x => !temp.includes(x));
					if (dif.length === 1) {
						solvedDigits[5] = temp;
					}
				}
				// TODO next if is ugly
			} else if (!solvedDigits[2] && solvedDigits[0] && solvedDigits[1] && solvedDigits[3]
				&& solvedDigits[4] && solvedDigits[5] && solvedDigits[6] && solvedDigits[7]
				&& solvedDigits[8] && solvedDigits[9]) {

				let temp = digit.split('');
				let tempString = JSON.stringify(temp);

				if (JSON.stringify(solvedDigits[0]) != tempString
					&& JSON.stringify(solvedDigits[1]) != tempString
					&& JSON.stringify(solvedDigits[3]) != tempString
					&& JSON.stringify(solvedDigits[4]) != tempString
					&& JSON.stringify(solvedDigits[5]) != tempString
					&& JSON.stringify(solvedDigits[6]) != tempString
					&& JSON.stringify(solvedDigits[7]) != tempString
					&& JSON.stringify(solvedDigits[8]) != tempString
					&& JSON.stringify(solvedDigits[9]) != tempString) {

					solvedDigits[2] = temp;

					// all are now solved
					let outputEntries = output[index].split(' ');

					let outputString = '';
					outputEntries.forEach((x) => {
							let digits = x.split('');

							solvedDigits.forEach((y, index) => {
								let solvedDigit = y;
								if (digits.every(x => solvedDigit.includes(x)) && digits.length === solvedDigit.length) {
									outputString += index;
								}
							});

						}
					);

					sumOutput += parseInt(outputString);
					solved = true;
				}
			}
		});
	}

});

console.log('Day 8 Puzzle 2: ' + sumOutput);