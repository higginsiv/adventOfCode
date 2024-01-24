console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '10', '2'];
const data = fr
  .getInput(year, day)
  .map((x) => parseInt(x))
  .sort((a, b) => a - b);

let combos = new Map();

function findCombos(curr) {
  let ones = 0;
  let twos = 0;
  let threes = 0;

  if (data.includes(curr + 1)) {
    if (combos.get(curr + 1) != null) {
      ones += combos.get(curr + 1);
    } else {
      ones += findCombos(curr + 1);
    }
  }
  if (data.includes(curr + 2)) {
    if (combos.get(curr + 2) != null) {
      twos += combos.get(curr + 2);
    } else {
      twos += findCombos(curr + 2);
    }
  }
  if (data.includes(curr + 3)) {
    if (combos.get(curr + 3) != null) {
      threes += combos.get(curr + 3);
    } else {
      threes += findCombos(curr + 3);
    }
  }
  if (data.indexOf(curr) === data.length - 1) {
    combos.set(curr, 1);
    return 1;
  } else {
    combos.set(curr, ones + twos + threes);
    return ones + twos + threes;
  }
}

let answer = findCombos(0);
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
