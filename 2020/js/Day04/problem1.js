console.time();
const fr = require('../../../tools/fileReader');
const { EOL } = require('os');
const [year, day, part] = ['2020', '04', '1'];
const data = fr.getInput(year, day, EOL + EOL);

const [BIRTH_YEAR, ISSUE_YEAR, EXPIRATION_YEAR, HEIGHT, HAIR_COLOR, EYE_COLOR, PASSPORT_ID] = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
];
const DELIM = ':';

let answer = data.reduce((total, curr) => {
  return curr.includes(BIRTH_YEAR + DELIM) &&
    curr.includes(ISSUE_YEAR + DELIM) &&
    curr.includes(EXPIRATION_YEAR + DELIM) &&
    curr.includes(HEIGHT + DELIM) &&
    curr.includes(HAIR_COLOR + DELIM) &&
    curr.includes(EYE_COLOR + DELIM) &&
    curr.includes(PASSPORT_ID + DELIM)
    ? total + 1
    : total;
}, 0);
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
