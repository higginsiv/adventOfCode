console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '12', '1'];
let obj = JSON.parse(fr.getInput(year, day)[0]);

let answer = traverse(obj);

function traverse(obj) {
    let localSum = 0;

    if (typeof obj === 'string') {
        return 0;
    }

    if (Array.isArray(obj)) {
        console.log(obj);
        return obj.reduce((total, curr) => {
            return total + traverse(curr);
        }, 0);
    }

    if (!isNaN(obj)) {
        localSum += parseInt(obj);
    }

    let vals = Object.values(obj);

    for (let val of vals) {
        if (val == 'red') {
            localSum = 0;
            break;
        } else if (!isNaN(val)) {
            localSum += parseInt(val);
        } else if (Array.isArray(val)) {
            localSum += val.reduce((total, curr) => {
                return total + traverse(curr);
            }, 0);
        } else if (typeof val === 'object') {
            localSum += traverse(val);
        }
    }
    return localSum;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
