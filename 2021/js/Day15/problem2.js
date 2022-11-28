const fr = require('../../../tools/fileReader');
const data = fr.getInput("2021",15).map(x => x.split('').map(y => {
	return {
		'risk': parseInt(y),
		'lowRisk': null
	}
}));

let bigData = new Array(data.length * 5)
	.fill(null)
	.map(() => new Array(data[0].length * 5)
		.fill(null)
	);

const dataXLength = data.length;
const dataYLength = data[0].length;

for (let i = 0; i < data.length; i++) {
	let line = data[i];
	for (let j = 0; j < line.length; j++) {
		for (let k = 0; k < 5; k++) {
			for (let l = 0; l < 5; l++) {
				let riskAddition = k + l;
				let newRisk = (line[j].risk + riskAddition) > 9
					? (line[j].risk + riskAddition) - (9 * Math.floor((line[j].risk + riskAddition) / 9))
					: line[j].risk + riskAddition;

				bigData[i + (l * dataXLength)][j + (k * dataYLength)] = {
					'risk': newRisk,
					'lowRisk': null
				};
			}
		}
	}
}

const goalX = bigData.length - 1;
const goalY = bigData[0].length - 1;

traverse(0, 0, 0);

async function traverse(x, y, riskCount) {
	if (x > goalX || y > goalY || x < 0 || y < 0) {
		return;
	}

	if (x + y !== 0) {
		riskCount += bigData[x][y].risk;
	}

	const currentLowRisk = bigData[x][y].lowRisk;

	if (currentLowRisk == null || currentLowRisk > riskCount) {
		bigData[x][y].lowRisk = riskCount;
	} else {
		return;
	}

	const goalLowRisk = bigData[goalX][goalY].lowRisk;
	const xDelta = goalX - x;
	const yDelta = goalY - y;

	if (goalLowRisk && (bigData[x][y].lowRisk + xDelta + yDelta) >= goalLowRisk) {
		// trimCount++;
		// trimmedPaths.set(x + ':' + y, true);
		return;
	}

	traverse(x + 1, y, riskCount);
	traverse(x, y + 1, riskCount);
	traverse(x, y - 1, riskCount);
}

console.log('Day 15 Puzzle 2: ' + bigData[goalX][goalY].lowRisk);