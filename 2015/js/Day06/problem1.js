console.time();
const fr = require('../../../tools/fileReader');
const keys = require('../../../tools/keys');

const [year, day, part] = ["2015","06","1"];
const [ON, OFF, TOGGLE] = [0, 1, 2];

let lightsOn = new Set();

fr.getInput(year,day).forEach(line => {
	let instruction;
	line = line.replace(' through ', ' ');
	if (line.includes('turn on')) {
		instruction = ON;
		line = line.substring(8);
	} else if (line.includes('turn off')) {
		instruction = OFF;
		line = line.substring(9);
	} else if (line.includes('toggle')) {
		instruction = TOGGLE;
		line = line.substring(7);
	}

	line = line.split(' ').map(coord => coord.split(','));

	let x1 = parseInt(line[0][0]);
	let x2 = parseInt(line[1][0]);
	let y1 = parseInt(line[0][1]);
	let y2 = parseInt(line[1][1]);

	// verify that the points are ordered nicely
	// if (x2 < x1 || y2 < y1) {
	// 	console.log('error')
	// }

	for (let i = x1; i <= x2; i++) {
		for (let j = y1; j <= y2; j++) {
			let key = keys.generateKey(i, j);

			if (instruction == ON) {
				lightsOn.add(key);
			} else if (instruction == OFF) {
				lightsOn.delete(key);
			} else if (instruction == TOGGLE) {
				if (lightsOn.has(key)) {
					lightsOn.delete(key);
				} else {
					lightsOn.add(key);
				}
			}
		}
	}
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + lightsOn.size);
console.timeEnd();