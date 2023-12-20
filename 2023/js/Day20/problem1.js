const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ["2023","20","1"];
const DATA = fr.getInput(YEAR,DAY);

let answer;
OUTPUT.output(YEAR, DAY, PART, answer);