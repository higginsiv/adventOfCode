const fr = require('../tools/fileReader');
const data = fr.getInput(14, '\n\n', 'input.txt');

let start = data[0].split('');
let rulesRaw = data[1].split('\n').map(x => x.split(' -> '));

// TODO can simplify this mapping
let rules = new Map();
rulesRaw.forEach(x => {
	rules.set(x[0], x[1]);
});

let pairCounts = new Map();
let letterCounts = new Map();

start.forEach((x, index) => {
	letterCounts.set(x, (letterCounts.get(x) || 0) + 1);

	if (index + 1 < start.length) {
		let k1 = x;
		let k2 = start[index + 1];
		let key = k1 + k2;
		pairCounts.set(key, (pairCounts.get(key) || 0) + 1);
	}
});

for (let i = 0; i < 40; i++) {
	let newPairCounts = new Map();
	pairCounts.forEach((val, key) => {
		let keys = key.split('');
		let addition = rules.get(key);
		letterCounts.set(addition, (letterCounts.get(addition) || 0) + val);

		let p1 = keys[0] + addition;
		let p2 = addition + keys[1];
		newPairCounts.set(p1, (newPairCounts.get(p1) || 0) + val);
		newPairCounts.set(p2, (newPairCounts.get(p2) || 0) + val);
	});

	pairCounts = new Map(newPairCounts);
}

const highest = Math.max(...letterCounts.values());
const lowest = Math.min(...letterCounts.values());
const dif = highest - lowest;

console.log(dif);
