const fr = require('./fileReader');
const OUTPUT = require('./output');
const { Solution, LogStrategy } = require('./solution');

// Get year, day, and part from arguments
let [YEAR, DAY, PART] = process.argv.slice(2);

if (!YEAR || !DAY) {
    console.error('Usage: node solve.js <year> <day> [<part>]');
    process.exit(1);
}

if (DAY.length === 1) {
    DAY = DAY.padStart(2, '0');
}

let parts;
if (!PART) {
    if (DAY === '25') {
        parts = ['1'];
    } else {
        parts = ['1', '2'];
    }
} else {
    parts = [PART];
}

parts.forEach(async (part) => {
    let data = fr.getInputForFunction(YEAR, DAY);

    // Get the path to the solution file
    const path = `../${YEAR}/js/Day${DAY}/problem${part}.js`;
    const { solve } = require(path);

    // Run file at the path
    const timerKey = `${YEAR} Day ${DAY} Part ${part}`;
    console.time(timerKey);
    let answer = await solve(data);
    console.timeEnd(timerKey);

    // Output the answer
    if (!(answer instanceof Solution)) {
        answer = new Solution(answer.value, new LogStrategy());
    }
    answer.output();
});
