console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '23', '1'];
let data = fr.getInput(year, day, '').map((x) => parseInt(x));
const MOVES = 100;

let currIndex = 0;
for (let i = 0; i < MOVES; i++) {
    let curr = data[currIndex];
    let removed = data.splice(currIndex + 1, 3);

    let index = -1;
    let cupToFind = curr;
    while (index === -1) {
        cupToFind -= 1;
        if (cupToFind === 0) {
            cupToFind = 9;
        }
        index = data.indexOf(cupToFind);
    }

    data.splice(index + 1, 0, ...removed);

    currIndex = data.indexOf(curr) + 1;
    if (currIndex >= data.length) {
        currIndex = 0;
    }
    let nextCup = data[currIndex];

    while (data.indexOf(nextCup) !== 0) {
        data.push(data.shift());
    }
    currIndex = 0;
}

while (data[0] !== 1) {
    data.push(data.shift());
}

let answer = data.slice(1).join('');
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
