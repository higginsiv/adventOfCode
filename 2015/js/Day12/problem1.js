console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '12', '1'];
const answer = fr
  .getInput(year, day)[0]
  .match(/(-){0,1}\d{1,}/g)
  .reduce((total, curr) => {
    return (total += parseInt(curr));
  }, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
