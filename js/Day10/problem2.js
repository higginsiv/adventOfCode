const fr = require('../tools/fileReader');
const data = fr.getInput(10, '\n', 'input.txt').map(x => x.split(''));

const symbols = new Map([
	['{', '}'],
	['(', ')'],
	['[', ']'],
	['<', '>']
]);

const pointMap = new Map([
	[')', 1],
	[']', 2],
	['}', 3],
	['>', 4]
]);

let points = [];

for (let line of data) {
	let expected = [];
	for (let char of line) {
		if (symbols.has(char)) {
			expected.push(symbols.get(char));
		} else {
			if (expected[expected.length - 1] === char) {
				expected.pop();
			} else {
				expected = null;
				break;
			}
		}
	}

	if (expected !== null) {
		let lineScore = 0;
		expected.reverse();

		expected.forEach(x => {
			lineScore *= 5;
			lineScore += pointMap.get(x);
		})
		points.push(lineScore);
	}
}

points.sort((x, y) => x - y);
console.log('Day 10 Puzzle 2: ' + points[Math.floor(points.length / 2)]);
