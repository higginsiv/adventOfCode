console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2015","10","2"];

const ITERATIONS = 50;
let data = fr.getInput(year,day)[0];

for (let i = 0; i < ITERATIONS; i++) {
  data = data.match(/(\d)\1{0,}/g).map(x => x.length + x[0]).join('');
}

let answer = data.length;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();