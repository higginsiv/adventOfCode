const fr = require('../../../tools/fileReader');
const data = fr.getInput('2021', 14, '\n\n', 'input.txt');

let start = data[0].split('');
let rulesRaw = data[1].split('\n').map((x) => x.split(' -> '));

// TODO can simplify this mapping
let rules = new Map();
rulesRaw.forEach((x) => {
    rules.set(x[0], x[1]);
});

let pairCounts = new Map();
let letterCounts = new Map();

start.forEach((x, index) => {
    letterCounts.set(x, (letterCounts.get(x) || 0) + 1);

    if (index + 1 < start.length) {
        const k1 = x;
        const k2 = start[index + 1];
        const key = k1 + k2;
        pairCounts.set(key, (pairCounts.get(key) || 0) + 1);
    }
});

for (let i = 0; i < 40; i++) {
    let newPairCounts = new Map();
    pairCounts.forEach((val, key) => {
        const keys = key.split('');
        const addition = rules.get(key);
        letterCounts.set(addition, (letterCounts.get(addition) || 0) + val);

        const p1 = keys[0] + addition;
        const p2 = addition + keys[1];
        newPairCounts.set(p1, (newPairCounts.get(p1) || 0) + val);
        newPairCounts.set(p2, (newPairCounts.get(p2) || 0) + val);
    });

    pairCounts = newPairCounts;
}

const highest = Math.max(...letterCounts.values());
const lowest = Math.min(...letterCounts.values());
const dif = highest - lowest;

console.log('Day 14 Puzzle 2: ' + dif);
