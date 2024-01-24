console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '10', '1'];
const data = fr
  .getInput(year, day)
  .map((x) => parseInt(x))
  .sort((a, b) => a - b);

let ones = 0;
let threes = 0;

for (let i = 0; i < data.length; i++) {
  let diff;
  if (i === 0) {
    diff = data[i] - 0;
  } else {
    diff = data[i] - data[i - 1];
  }

  if (diff === 1) {
    ones++;
  } else if (diff === 3) {
    threes++;
  }
}

threes++;

let answer = ones * threes;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
