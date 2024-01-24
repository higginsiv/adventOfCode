console.time();
const fr = require('../../../tools/fileReader');
const { EOL } = require('os');
const [year, day, part] = ['2020', '06', '1'];
const data = fr.getInput(year, day, EOL + EOL).map((x) => {
  x = x.replaceAll(EOL, '');
  x = x.split('');
  x = new Set(x);
  return x;
});

let answer = data.reduce((total, curr) => {
  return total + curr.size;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
