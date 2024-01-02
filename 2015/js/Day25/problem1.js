const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ["2015","25","1"];
const [ROW, COLUMN] = fr.getInput(YEAR,DAY).map(line => line.match(/\d+/g).map(Number))[0];

const START = 20151125;
const MULTIPLIER = 252533;
const DIVIDER = 33554393;

function getColumnValue(n) {
    return n*(n+1)/2;
}

function getRowAndColumnValue(columnValue, rowsAfterFirst, columnNumber) {
    return columnValue + rowsAfterFirst * columnNumber + rowsAfterFirst * (rowsAfterFirst - 1) / 2;
}

let codeNumber = getRowAndColumnValue(getColumnValue(COLUMN), ROW - 1, COLUMN);

let answer = START;

for (let i = 1; i < codeNumber; i++) {
    answer = (answer * MULTIPLIER) % DIVIDER;
}

OUTPUT.output(YEAR, DAY, PART, answer);