console.time();
const fr = require('../../../tools/fileReader');
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","05","1"];
let data = fr.getInput(year,day, ',').map(x => parseInt(x));

let answer = ic.run(data, 0, [1])

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer[answer.length - 1]);
console.timeEnd();