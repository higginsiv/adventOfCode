const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["2023","11","1"];

let galaxies = [];
let expandedRows = [];
let expandedColumns = [];

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
        expandedRows.push(index);
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
        expandedColumns.push(j);
    }
}

let answer = 0;
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        answer += expandedManhattanDistance(galaxies[i], galaxies[j]);
    }
}

function expandedManhattanDistance(a, b) {
    let rowsBetween = expandedRows.filter((row) => (row > a[0] && row < b[0]) || (row < a[0] && row > b[0]));
    let colsBetween = expandedColumns.filter((col) => (col > a[1] && col < b[1]) || (col < a[1] && col > b[1]));
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + rowsBetween.length + colsBetween.length;
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);