const fs = require('node:fs');

const [YEAR, DAY] = process.argv.slice(2);

const LEGACY = process.env.npm_config_legacy;

if (!YEAR || !DAY) {
    console.error('Usage: node dayCreators.js <year> <day>');
    process.exit(1);
}

if (DAY.length === 1) {
    DAY = DAY.padStart(2, '0');
}

if (!fs.existsSync(`${YEAR}/js/Day${DAY}`)){
    console.log(`Creating advent directory for ${YEAR} Day ${DAY}`);

    fs.mkdirSync(`${YEAR}/js/Day${DAY}`, { recursive: true });

    fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem1.js`, getTemplate(1, LEGACY));
    fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem2.js`, getTemplate(2, LEGACY));
    fs.writeFileSync(`${YEAR}/js/Day${DAY}/input.txt`, '');
    fs.writeFileSync(`${YEAR}/js/Day${DAY}/README.md`, '');
} else {
    console.error(`Directory ${YEAR}/js/Day${DAY} already exists`);
    process.exit(1);
}

function getTemplate(part, legacy) {
    if (legacy) {
        return `const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ["${YEAR}","${DAY}","${part}"];
const DATA = fr.getInput(YEAR,DAY);
        
let answer;
OUTPUT.output(YEAR, DAY, PART, answer);`
    } else {
        return `module.exports = {solve: solve};

function solve({lines, rawData}) {

    let answer;
    return {value: answer};
}`;
    }
}