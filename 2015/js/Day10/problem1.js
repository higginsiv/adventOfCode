console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '10', '1'];

const ITERATIONS = 40;
let current = fr.getInput(year, day, '').map((x) => parseInt(x));

for (let i = 0; i < ITERATIONS; i++) {
  let next = [];
  while (current.length > 0) {
    let char = current.shift();
    let numChar = 1;
    while (current[0] == char) {
      current.shift();
      numChar++;
    }
    next.push(numChar);
    next.push(char);
  }
  current = next;
}

let answer = current.length;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
