console.time();
const fr = require('../../../tools/fileReader');
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","02","1"];
let data = fr.getInput(year,day, ',').map(x => BigInt(x));
data[1] = 12n;
data[2] = 2n;

ic.run(data, 0n).then(() => {
    let answer = data[0]

    console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
    console.log('Expected: 3850704')
    console.timeEnd();
});
