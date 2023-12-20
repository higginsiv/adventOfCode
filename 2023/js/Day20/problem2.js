const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","20","2"];
const DATA = fr.getInput(YEAR,DAY);

let answer;
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);