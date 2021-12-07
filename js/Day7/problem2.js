const fr = require('../tools/fileReader');
const data = fr.getInput(7, ',')
	.map(x => parseInt(x))
	.sort((x, y) => x - y);

let bestDelta = null;
for (let i = data[0]; i < data[data.length - 1]; i++) {
	const delta = data.reduce((previous, current) => {
		const dif = Math.abs(current - i);
		const summation = dif * (dif + 1) * .5;
		return previous += summation;
	}, 0);

	if (bestDelta === null || delta < bestDelta) {
		bestDelta = delta;
	}
}

console.log('Day 7 Puzzle 2: ' + bestDelta);