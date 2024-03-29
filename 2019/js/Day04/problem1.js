console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2019', '04', '1'];
const [low, high] = fr.getInput(year, day, '-').map((x) => parseInt(x));

let answer = 0;
for (let i = low; i <= high; i++) {
    let pass = i.toString().split('');
    let ascDigs = true;
    let twoAdj = false;

    let lastDig;
    while (pass.length > 0) {
        let dig = parseInt(pass.shift());
        if (lastDig && dig < lastDig) {
            ascDigs = false;
            break;
        }
        if (lastDig === dig) {
            twoAdj = true;
        }
        lastDig = dig;
    }
    if (ascDigs && twoAdj) {
        answer++;
    }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
