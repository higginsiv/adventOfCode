console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2019","","2"];
const data = fr.getInput(year,day);

let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();