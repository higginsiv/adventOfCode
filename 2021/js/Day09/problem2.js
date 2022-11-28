const fr = require('../../../tools/fileReader');
const data = fr.getInput("2021","09", '\n', 'input.txt').map(x => x.split('').map(x => parseInt(x)));

let basins = [];

data.forEach((line, index) => {
	line.forEach((digit, indexy) => {
		if ((line[indexy - 1] === undefined || line[indexy - 1] > digit)
			&& (line[indexy + 1] === undefined || line[indexy + 1] > digit)
			&& ((data[index - 1] === undefined || data[index - 1][indexy] === undefined) || data[index - 1][indexy] > digit)
			&& ((data[index + 1] === undefined || data[index + 1][indexy] === undefined) || data[index + 1][indexy] > digit)) {
			let traversed = [];
			basins.push(getBasin(index, indexy, digit, traversed));
		}
	})
});

basins.sort((x, y) => y - x);
console.log('Day 9 Puzzle 2: ' + basins[0] * basins[1] * basins[2]);

function getBasin(x, y, value, traversed) {
	if (value === 9 || (traversed[x] && traversed[x][y])) {
		return 0;
	}

	if (!traversed[x]) {
		traversed[x] = [];
	}

	traversed[x][y] = 1;

	let basinVal = 1;
	if (data[x][y - 1] !== undefined && data[x][y - 1] > value) {
		basinVal += (getBasin(x, y - 1, data[x][y - 1], traversed));
	}
	if (data[x][y + 1] !== undefined && data[x][y + 1] > value) {
		basinVal += (getBasin(x, y + 1, data[x][y + 1], traversed));
	}
	if (data[x - 1] !== undefined && data[x - 1][y] !== undefined && data[x - 1][y] > value) {
		basinVal += (getBasin(x - 1, y, data[x - 1][y], traversed));
	}
	if (data[x + 1] !== undefined && data[x + 1][y] !== undefined && data[x + 1][y] > value) {
		basinVal += (getBasin(x + 1, y, data[x + 1][y], traversed));
	}

	return basinVal;
}