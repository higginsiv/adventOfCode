console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2019","01","2"];
let answer = fr.getInput(year,day).map(x => parseInt(x)).reduce((total, curr) => {
    return total + calcFule(curr)
}, 0);

function calcFule(mass) {
    let fuel = Math.floor(mass / 3) - 2
    if (fuel <= 0) {
        return 0
    }
    return fuel + calcFule(fuel);
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();