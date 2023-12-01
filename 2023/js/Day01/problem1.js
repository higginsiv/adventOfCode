console.time();
const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","01","1"];
const DATA = fr.getInput(YEAR,DAY);

let answer = DATA.reduce((total,curr) => {
    let digits = [...curr.matchAll(/\d/g)];
    return total + parseInt(digits[0][0] + digits[digits.length - 1][0]);
},0);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
console.timeEnd();