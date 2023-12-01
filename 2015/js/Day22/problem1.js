console.time();
const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2015","22","1"];
const DATA = fr.getInput(YEAR,DAY);

let answer;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
console.timeEnd();