import fs from 'node:fs';

let [YEAR, DAY] = process.argv.slice(2);

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

    fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem1.js`, getTemplate(1));
    if (DAY !== '25') {
        fs.writeFileSync(`${YEAR}/js/Day${DAY}/problem2.js`, getTemplate(2));
    }

    fs.writeFileSync(`${YEAR}/js/Day${DAY}/input.txt`, '');
    fs.writeFileSync(`${YEAR}/js/Day${DAY}/README.md`, '');

    if (!fs.existsSync(`${YEAR}/js/Day${DAY}/tests`)) {
        fs.mkdirSync(`${YEAR}/js/Day${DAY}/tests`, { recursive: true });
        fs.writeFileSync(`${YEAR}/js/Day${DAY}/tests/${YEAR}-${DAY}.test.js`, getTestTemplate(DAY));
    }
} else {
    console.error(`Directory ${YEAR}/js/Day${DAY} already exists`);
    process.exit(1);
}

function getTemplate(part) {
    return `import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {

    const answer = null;
    return new Solution(answer);
}`;
}

function getTestTemplate(day) {
    if (day === '25') {
        return `import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
        
const data = getInputForFunction(\'${YEAR}\', \'${DAY}\');
        
describe(\`${YEAR} Day ${DAY}\`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe();
    });
});`;
    }

    return `import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction(\'${YEAR}\', \'${DAY}\');

describe(\`${YEAR} Day ${DAY}\`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe();
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe();
    });
});`;
}
