console.time();
const { EOL } = require('os');
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '22', '1'];
let [player1, player2] = fr.getInput(year, day, EOL + EOL).map((x) => {
  x = x.split(EOL);
  x.shift();
  x = x.map((y) => parseInt(y));
  return x;
});

while (player1.length > 0 && player2.length > 0) {
  let p1Card = player1.shift();
  let p2Card = player2.shift();

  if (p1Card > p2Card) {
    player1.push(p1Card, p2Card);
  } else {
    player2.push(p2Card, p1Card);
  }
}

let answer;

if (player1.length > 0) {
  answer = player1.reduce((total, curr, index) => {
    return total + curr * (player1.length - index);
  }, 0);
} else {
  answer = player2.reduce((total, curr, index) => {
    return total + curr * (player2.length - index);
  }, 0);
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
