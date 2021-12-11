const fr = require('../tools/fileReader');
const data = fr.getInput(11).map(x => {
	let line = x.split('');
	line = line.map(y => {
		return {
			'val': parseInt(y),
			'flashed': false
		}
	})
	return line;
});

let flashes = 0;

for (let i = 0; i < 100; i++) {
	// step 1
	for (let line of data) {
		for (let octo of line) {
			octo.val++;
			octo.flashed = false;
		}
	}

	// step 2
	let flash = true;
	while (flash) {
		flash = false;
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].length; j++) {
				let octo = data[i][j];
				if (octo.val > 9 && !octo.flashed) {
					flash = true;
					flashes++;
					octo.flashed = true;

					let neighbors = [];

					if (j > 0) {
						let octoW = data[i][j - 1];
						neighbors.push(octoW);
					}

					if (j < 9) {
						let octoE = data[i][j + 1];
						neighbors.push(octoE);
					}

					if (i > 0) {
						let octoN = data[i - 1][j];
						neighbors.push(octoN);
					}

					if (i < 9) {
						let octoS = data[i + 1][j];
						neighbors.push(octoS);
					}

					if (i > 0 && j < 9) {
						let octoNE = data[i - 1][j + 1];
						neighbors.push(octoNE);
					}

					if (i > 0 && j > 0) {
						let octoNW = data[i - 1][j - 1];
						neighbors.push(octoNW);
					}

					if (i < 9 && j < 9) {
						let octoSE = data[i + 1][j + 1];
						neighbors.push(octoSE);
					}

					if (i < 9 && j > 0) {
						let octoSW = data[i + 1][j - 1];
						neighbors.push(octoSW);
					}

					neighbors.forEach(octo => octo.val++);
				}
			}
		}
	}

	for (let line of data) {
		for (let octo of line) {
			if (octo.val > 9) {
				octo.val = 0;
			}
		}
	}
}

console.log('Day 11 Puzzle 1: ' + flashes);