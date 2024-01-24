const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '01', '1'];
const data = fr.getInput(year, day).map((x) => parseInt(x));
const GOAL_NUM = 2020;
let answer;

for (let i = 0; i < data.length; i++) {
  const num = data[i];
  const antiNum = GOAL_NUM - num;
  if (data.includes(antiNum)) {
    answer = num * antiNum;
    break;
  }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
