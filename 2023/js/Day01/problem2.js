console.time();
const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '01', '2'];
const DATA = fr.getInput(YEAR, DAY);
const DIGITS = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
  ['eno', 1],
  ['owt', 2],
  ['eerht', 3],
  ['ruof', 4],
  ['evif', 5],
  ['xis', 6],
  ['neves', 7],
  ['thgie', 8],
  ['enin', 9],
]);

const regex = new RegExp(/(\d|one|two|three|four|five|six|seven|eight|nine)/g);
const backwardsRegex = new RegExp(/(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g);

let answer = DATA.reduce((total, curr) => {
  let backwardsCurr = curr.split('').reverse().join('');

  let digit1Raw = curr.match(regex)[0];
  let digit1 = DIGITS.get(digit1Raw) == null ? digit1Raw : DIGITS.get(digit1Raw);
  let lastDigitRaw = backwardsCurr.match(backwardsRegex)[0];
  let lastDigit = DIGITS.get(lastDigitRaw) == null ? lastDigitRaw : DIGITS.get(lastDigitRaw);

  return total + parseInt(`${digit1}${lastDigit}`);
}, 0);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
console.timeEnd();
