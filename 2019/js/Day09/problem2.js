console.time();
const fr = require('../../../tools/fileReader');
const ic = require('../common/IntCode.js');
const [year, day, part] = ['2019', '09', '2'];
const data = fr.getInput(year, day, ',').map((x) => BigInt(x));

ic.run(data, 0n, [2n]).then((answer) => {
  console.log(
    'Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer[answer.length - 1],
  );
  console.log('Expected: 45710');
  console.timeEnd();
});
