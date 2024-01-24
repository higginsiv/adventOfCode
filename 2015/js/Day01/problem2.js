console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '01', '2'];

let floor = 0;
let answer;
const data = fr.getInput(year, day, '');

for (let i = 0; i < data.length; i++) {
  let dir = data[i];
  floor = dir === '(' ? floor + 1 : floor - 1;
  if (floor === -1) {
    answer = i + 1;
    break;
  }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
