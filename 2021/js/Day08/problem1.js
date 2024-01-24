const fr = require('../../../tools/fileReader');
const data = fr.getInput('2021', '08');

let input = [];
let output = [];

data.forEach((x) => {
  const entry = x.split(' | ');
  input.push(entry[0]);
  output.push(entry[1]);
});

let numSuccess = 0;

input.forEach((x, index) => {
  let solved = false;
  let solvedDigits = [];

  let digits = x.split(' ');

  while (!solved) {
    digits.forEach((digit) => {
      if (!solvedDigits[1] && digit.length === 2) {
        console.log(1);
        solvedDigits[1] = digit.split('');
      } else if (!solvedDigits[4] && digit.length === 4) {
        console.log(4);
        solvedDigits[4] = digit.split('');
      } else if (!solvedDigits[7] && digit.length === 3) {
        console.log(7);
        solvedDigits[7] = digit.split('');
      } else if (!solvedDigits[8] && digit.length === 7) {
        console.log(8);
        solvedDigits[8] = digit.split('');
      } else if (
        !solvedDigits[3] &&
        digit.length === 5 &&
        solvedDigits[1] &&
        solvedDigits[1].every((x) => digit.includes(x))
      ) {
        console.log(3);
        solvedDigits[3] = digit.split('');
      } else if (
        !solvedDigits[9] &&
        digit.length === 6 &&
        solvedDigits[3] &&
        solvedDigits[3].every((x) => digit.includes(x))
      ) {
        console.log(9);
        solvedDigits[9] = digit.split('');
      } else if (
        !solvedDigits[0] &&
        digit.length === 6 &&
        solvedDigits[3] &&
        !solvedDigits[3].every((x) => digit.includes(x)) &&
        solvedDigits[1] &&
        solvedDigits[1].every((x) => digit.includes(x))
      ) {
        console.log(0);
        solvedDigits[0] = digit.split('');
      } else if (!solvedDigits[6] && digit.length === 6 && solvedDigits[0] && solvedDigits[9]) {
        // we've solved the other 6 segment digits
        console.log(6);
        solvedDigits[6] = digit.split('');
      } else if (!solvedDigits[5] && solvedDigits[9] && digit.length === 5) {
        console.log(5);
        let temp = digit.split('');
        let dif = solvedDigits[9].filter((x) => !temp.includes(x));
        if (dif.length === 1) {
          solvedDigits[5] = temp;
        }
      } else if (
        !solvedDigits[2] &&
        solvedDigits[0] &&
        solvedDigits[1] &&
        solvedDigits[3] &&
        solvedDigits[4] &&
        solvedDigits[5] &&
        solvedDigits[6] &&
        solvedDigits[7] &&
        solvedDigits[8] &&
        solvedDigits[9]
      ) {
        console.log(2);
        // TODO incorrectly assigns 2
        solvedDigits[2] = digit.split('');

        // all are now solved
        let outputDigits = output[index].split(' ');

        outputDigits.forEach((x) => {
          let digits = x.split('');
          if (
            (digits.every((x) => solvedDigits[1].includes(x)) &&
              x.length === solvedDigits[1].length) ||
            (digits.every((x) => solvedDigits[4].includes(x)) &&
              x.length === solvedDigits[4].length) ||
            (digits.every((x) => solvedDigits[7].includes(x)) &&
              x.length === solvedDigits[7].length) ||
            (digits.every((x) => solvedDigits[8].includes(x)) &&
              x.length === solvedDigits[8].length)
          ) {
            numSuccess++;
          }
        });

        solved = true;
      }
    });
  }
});

console.log('Day 8 Puzzle 1: ' + numSuccess);
