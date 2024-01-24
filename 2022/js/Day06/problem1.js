const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '06', '1'];
const data = fr.getInput(year, day, '');

let answer;

const groupSize = 4;
for (let i = 0; i < data.length; i++) {
  if (
    data
      .slice(i, i + groupSize)
      .every((current, index, currentGroup) => currentGroup.lastIndexOf(current) === index)
  ) {
    answer = i + groupSize;
    break;
  }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
