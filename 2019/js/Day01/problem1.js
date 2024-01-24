console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2019', '01', '1'];
let answer = fr
  .getInput(year, day)
  .map((x) => parseInt(x))
  .reduce((total, curr) => {
    return total + Math.floor(curr / 3) - 2;
  }, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
