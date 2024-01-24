console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '09', '1'];
const data = fr.getInput(year, day).map((x) => parseInt(x));
const CHUNK_SIZE = 25;

let answer;

for (let i = CHUNK_SIZE; i < data.length; i++) {
  let allGood = false;
  for (let j = i - CHUNK_SIZE; j < i; j++) {
    for (let k = j + 1; k < i; k++) {
      if (data[j] + data[k] === data[i] && data[j] !== data[k]) {
        allGood = true;
        break;
      }
    }
    if (allGood) {
      break;
    }
  }
  if (!allGood) {
    answer = data[i];
    break;
  }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
