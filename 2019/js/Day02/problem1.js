console.time();
const fr = require('../../../tools/fileReader');
const ic = require('../common/IntCode.js');
const [year, day, part] = ["2019","02","1"];
let data = fr.getInput(year,day, ',').map(x => parseInt(x));
data[1] = 12;
data[2] = 2;

ic.run(data, 0).then(() => {
    let answer = data[0]

    console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
    console.timeEnd();
});
