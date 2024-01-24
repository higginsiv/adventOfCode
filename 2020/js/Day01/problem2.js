const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '01', '2'];
const data = fr.getInput(year, day).map((x) => parseInt(x));
const GOAL_NUM = 2020;
let answer;

for (let i = 0; i < data.length - 1; i++) {
  const num = data[i];
  for (let j = i + 1; j < data.length; j++) {
    const numTwo = data[j];
    const antiNum = GOAL_NUM - (num + numTwo);
    if (data.includes(antiNum) && num !== antiNum && numTwo !== antiNum) {
      answer = num * numTwo * antiNum;
      break;
    }
  }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
