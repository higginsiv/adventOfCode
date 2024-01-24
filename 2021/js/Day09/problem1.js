const fr = require('../../../tools/fileReader');
const data = fr.getInput('2021', '09').map((x) => x.split('').map((x) => parseInt(x)));

let riskLevelSum = 0;

data.forEach((line, index) => {
  line.forEach((digit, indexy) => {
    if (
      (line[indexy - 1] === undefined || line[indexy - 1] > digit) &&
      (line[indexy + 1] === undefined || line[indexy + 1] > digit) &&
      (data[index - 1] === undefined ||
        data[index - 1][indexy] === undefined ||
        data[index - 1][indexy] > digit) &&
      (data[index + 1] === undefined ||
        data[index + 1][indexy] === undefined ||
        data[index + 1][indexy] > digit)
    ) {
      riskLevelSum += digit + 1;
    }
  });
});

console.log('Day 9 Puzzle 1: ' + riskLevelSum);
