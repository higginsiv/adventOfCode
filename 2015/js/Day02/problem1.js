console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '02', '1'];
const answer = fr
    .getInput(year, day)
    .map((x) => {
        return x.split('x').map((v) => parseInt(v));
    })
    .reduce((total, curr) => {
        let areas = [curr[0] * curr[1], curr[0] * curr[2], curr[1] * curr[2]].sort((a, b) => a - b);
        return total + 3 * areas[0] + 2 * areas[1] + 2 * areas[2];
    }, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
