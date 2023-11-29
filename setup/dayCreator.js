const fs = require('node:fs');

const [YEAR, DAY] = process.argv.slice(2);

console.log(`Creating advent directory for ${YEAR} Day ${DAY}`);

if (!fs.existsSync(`${YEAR}/js/Day${DAY}`)){
    fs.mkdirSync(`${YEAR}/js/Day${DAY}`);
}

fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem1.js`, getTemplate(1));
fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem2.js`, getTemplate(2));
fs.writeFileSync(`${YEAR}/js/Day${DAY}/input.txt`, '');
fs.writeFileSync(`${YEAR}/js/Day${DAY}/README.md`, '');

function getTemplate(part) {
    return `console.time();
const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ["${YEAR}","${DAY}","${part}"];
const DATA = fr.getInput(YEAR,DAY);

let answer;
console.log(\`Year \${YEAR} Day \${DAY} Puzzle \${PART}: \${answer}\`);
console.timeEnd();`
}


