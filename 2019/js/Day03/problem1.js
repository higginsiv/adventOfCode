console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2019","03","1"];
const data = fr.getInput(year,day).map(x => {
    x = x.split(',').map(y => {
        y = y.split('');
        return [y.shift(), parseInt(y.join(''))]
    })
    return x
});
console.log(data)
let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();