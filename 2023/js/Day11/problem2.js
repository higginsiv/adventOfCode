const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","11","2"];
const EXPANSION_FACTOR = 1000000;

let galaxies = [];
let badRows = [];
let badColumns = [];

const DATA = fr.getInput(YEAR,DAY);
DATA.forEach((line, index) => {
    let regex = /#/g;
    let match;
    let galaxiesInLine = 0;
    while ((match = regex.exec(line)) !== null) {
        galaxiesInLine++;
        galaxies.push([index, match.index]);
    }
    if (galaxiesInLine === 0) {
        badRows.push(index);
    }
}); 

for (let j = 0; j < DATA[0].length; j++) {
    let containsGalaxy = false;
    for (let i = 0; i < DATA.length; i++) {
       if (DATA[i][j] === '#') {
           containsGalaxy = true;
           break;
       }
    }
    if (!containsGalaxy) {
        badColumns.push(j);
    }
}

let answer = 0;
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        answer += expandedManhattanDistance(galaxies[i], galaxies[j]);
    }
}

function expandedManhattanDistance(a, b) {
    let rowsBetween = badRows.filter((row) => (row > a[0] && row < b[0]) || (row < a[0] && row > b[0]));
    let colsBetween = badColumns.filter((col) => (col > a[1] && col < b[1]) || (col < a[1] && col > b[1]));
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + (EXPANSION_FACTOR - 1) * (rowsBetween.length + colsBetween.length);
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);