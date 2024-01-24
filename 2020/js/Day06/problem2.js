console.time();
const fr = require('../../../tools/fileReader');
const { EOL } = require('os');
const [year, day, part] = ['2020', '06', '2'];
const data = fr.getInput(year, day, EOL + EOL).map((x) => x.split(EOL).map((y) => y.split('')));

let answer = data.reduce((total, curr) => {
    let groupYesses = curr.reduce((allYes, passenger) => {
        let ret = [];
        allYes.forEach((question) => {
            if (passenger.includes(question)) {
                ret.push(question);
            }
        });
        return ret;
    });
    return total + groupYesses.length;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
