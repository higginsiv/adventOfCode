const fs = require('node:fs');

let [YEAR, DAY] = process.argv.slice(2);

const LEGACY = process.env.npm_config_legacy;

if (!YEAR || !DAY) {
    console.error('Usage: node dayCreators.js <year> <day>');
    process.exit(1);
}

const dayInt = parseInt(DAY);
if (isNaN(dayInt) || dayInt < 1 || dayInt > 25) {
    console.error('Day must be an integer between 1 and 25');
    process.exit(1);
}

if (DAY.length === 1) {
    DAY = DAY.padStart(2, '0');
}

if (!fs.existsSync(`${YEAR}/js/Day${DAY}`)) {
    console.log(`Creating advent directory for ${YEAR} Day ${DAY}`);

    fs.mkdirSync(`${YEAR}/js/Day${DAY}`, { recursive: true });

    fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem1.js`, getTemplate(1, LEGACY));
    fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem2.js`, getTemplate(2, LEGACY));
    fs.writeFileSync(`${YEAR}/js/Day${DAY}/input.txt`, '');
    fs.writeFileSync(`${YEAR}/js/Day${DAY}/README.md`, '');

    if (!fs.existsSync(`${YEAR}/js/Day${DAY}/tests`)) {
        fs.mkdirSync(`${YEAR}/js/Day${DAY}/tests`, { recursive: true });
        fs.writeFileSync(`${YEAR}/js/Day${DAY}/tests/${YEAR}-${DAY}.test.js`, getTestTemplate());
    }
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
OUTPUT.output(YEAR, DAY, PART, answer);`;
    } else {
        return `module.exports = {solve: solve};

function solve({lines, rawData}) {

    const answer = null;
    return {value: answer};
}`;
    }
}

function getTestTemplate() {
    return `const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(\`../problem1.js\`);
const { solve: part2 } = require(\`../problem2.js\`);

const data = fr.getInputForFunction(\'${YEAR}\', \'${DAY}\');

describe(\`${YEAR} Day ${DAY}\`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe();
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe();
    });
});`;
}
