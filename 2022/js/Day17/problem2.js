const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2022","17","2"];
const data = fr.getInput(year,day);

let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);