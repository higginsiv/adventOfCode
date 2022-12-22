// This was an alt version of problem 1 written recursively to try (and fail)
// to solve problem 2

const fr = require('../../../tools/fileReader');
const data = fr.getInput("2021",14, '\n\n', 'input.txt');

let start = data[0].split('');
let rulesRaw = data[1].split('\n').map(x => x.split(' -> '));

// TODO can simplify this mapping
let rules = new Map();
rulesRaw.forEach(x => {
	rules.set(x[0], x[1]);
})

let totalOccurrences = new Map();
start.forEach(x => {
	totalOccurrences.set(x, (totalOccurrences.get(x) || 0) + 1);
});

for (let i = 0; i < start.length - 1; i++) {
	traverse(start[i], start[i + 1], 0);
}

function traverse(key1, key2, index) {
	if (index !== 10) {
		index++;
		const addition = rules.get(key1 + key2);
		totalOccurrences.set(addition, (totalOccurrences.get(addition) || 0) + 1);
		traverse(key1, addition, index);
		traverse(addition, key2, index);
	}
}

const highest = Math.max(...totalOccurrences.values());
const lowest = Math.min(...totalOccurrences.values());
const dif = highest - lowest;

console.log('Day 14 Puzzle 1 Recursive: ' + dif);