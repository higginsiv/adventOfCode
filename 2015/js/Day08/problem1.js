console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '08', '1'];

let totalChars = 0;
let escaped = 0;

fr.getInput(year, day).forEach((curr) => {
  totalChars += curr.length;
  curr = curr.substring(1, curr.length - 1);
  curr = curr.replaceAll(/(\\x(\d|[a-f]){2}|\\\"|\\\\)/g, '_');
  escaped += curr.length;
});

const answer = totalChars - escaped;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
