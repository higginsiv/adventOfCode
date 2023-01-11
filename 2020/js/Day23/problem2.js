console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","23","2"];
let data = fr.getInput(year,day, '').map(x => parseInt(x));
let big = [...Array(1000000).keys()]
big.splice(0, 9);
data = data.concat(big);
// for (let i = 10; i < 1000000; i++) {
//     data.push(i);
// }
const MOVES = 10000000;

let currIndex = 0;
for (let i = 0; i < MOVES; i++) {
    console.log(i)
    let curr = data[currIndex];
    let removed = data.splice(currIndex + 1, 3);

    let index = -1;
    let cupToFind = curr;
    while (index === -1) {
        cupToFind -= 1;
        if (cupToFind === 0) {
            cupToFind = 1000000;
        }
        index = data.indexOf(cupToFind);
    }

    data.splice(index + 1, 0, ...removed)

    currIndex = data.indexOf(curr) + 1;
    if (currIndex >= data.length) {
        currIndex = 0
    }
    let nextCup = data[currIndex];

    if (data.indexOf(nextCup) > data.length - 5) {
        while (data.indexOf(nextCup) !== 0) {
            data.push(data.shift())
        }
        currIndex = 0;
    }

}

// while (data[0] !== 1) {
//     data.push(data.shift());
// }

let answer = data[data.indexOf(1) + 1] * data[data.indexOf(1) + 2];
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();