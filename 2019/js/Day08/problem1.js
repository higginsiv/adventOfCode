console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2019', '08', '1'];
const WIDTH = 25;
const HEIGHT = 6;
const LAYER_SIZE = WIDTH * HEIGHT;

let minZeros = Infinity;
let minZeroOnes = 0;
let minZeroTwos = 0;
let currZeros = 0;
let currOnes = 0;
let currTwos = 0;
const data = fr
  .getInput(year, day, '')
  .map((x) => parseInt(x))
  .forEach((x, index) => {
    if (index % LAYER_SIZE === LAYER_SIZE - 1) {
      if (currZeros < minZeros) {
        minZeros = currZeros;
        minZeroOnes = currOnes;
        minZeroTwos = currTwos;
      }
      currZeros = 0;
      currOnes = 0;
      currTwos = 0;
    }

    switch (x) {
      case 0:
        currZeros++;
        break;
      case 1:
        currOnes++;
        break;
      case 2:
        currTwos++;
        break;
    }
  });

let answer = minZeroOnes * minZeroTwos;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
