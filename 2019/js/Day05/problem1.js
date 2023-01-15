console.time();
const fr = require('../../../tools/fileReader');
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","05","1"];
let data = fr.getInput(year,day, ',').map(x => BigInt(x));

ic.run(data, 0n, [1n]).then(answer => {
    console.log(answer)
    console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer[answer.length - 1]);
    console.log('Expected: 13818007')
    console.timeEnd();
})