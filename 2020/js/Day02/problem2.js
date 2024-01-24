const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '02', '2'];
const data = fr.getInput(year, day).map((x) => {
  x = x.replace('-', ' ');
  x = x.replace(':', '');
  x = x.split(' ');
  x[0] = parseInt(x[0]);
  x[1] = parseInt(x[1]);
  x[3] = x[3].split('');
  return x;
});

let answer = data.reduce((total, curr) => {
  const [pos1, pos2, letter, string] = curr;

  let charAtPos = string[pos1 - 1] === letter;
  let charAtPos2 = string[pos2 - 1] === letter;

  return (charAtPos && !charAtPos2) || (charAtPos2 && !charAtPos) ? total + 1 : total;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
