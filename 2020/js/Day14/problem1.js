console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '14', '1'];
const SKIP = 'X';

let memory = new Map();
let mask;
const data = fr.getInput(year, day).forEach((line) => {
  if (line.includes('mask')) {
    mask = line.substring(line.lastIndexOf(' ') + 1).split('');
  } else {
    line = line.replace('mem[', '');
    line = line.replace('] =', '');
    let [address, value] = line.split(' ');

    value = convertValue(parseInt(value));
    memory.set(address, maskValue(value).join(''));
  }
});

let answer = Array.from(memory.values()).reduce((total, curr) => {
  return total + parseInt(parseInt(curr, 2).toString(10));
}, 0);

// Convert an int to a padded base 2 array
function convertValue(value) {
  return value.toString(2).padStart(mask.length, '0').split('');
}

function maskValue(value) {
  mask.forEach((char, index) => {
    if (char !== SKIP) {
      value[index] = char;
    }
  });
  return value;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
