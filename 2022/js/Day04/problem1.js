const fr = require('../../../tools/fileReader');
const year = '2022';
const day = '04';
const data = fr.getInput(year, day);

let answer = data.reduce((badPairs, currentPair) => {
  let pair = currentPair.split(',');
  let elf1 = pair[0].split('-').map((x) => parseInt(x));
  let elf2 = pair[1].split('-').map((x) => parseInt(x));

  if ((elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) || (elf1[0] >= elf2[0] && elf1[1] <= elf2[1])) {
    badPairs++;
  }
  return badPairs;
}, 0);
console.log('Year ' + year + ' Day ' + day + ' Puzzle 1: ' + answer);
