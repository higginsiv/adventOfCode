const fr = require('./fileReader');
const OUTPUT = require('./output');

// Get year, day, and part from arguments
let [YEAR, DAY, PART] = process.argv.slice(2);

// const YEAR = process.env.npm_config_year;
// const DAY = process.env.npm_config_dayNum;
// const PART = process.env.npm_config_part;
const LEGACY = process.env.npm_config_legacy;

if (!YEAR || !DAY || !PART) {
    console.error('Usage: node solve.js <year> <day> <part>');
    process.exit(1);
}

if (DAY.length === 1) {
    DAY = DAY.padStart(2, '0');
}

if (LEGACY) {
    // Get the path to the solution file
    const path = `../${YEAR}/js/Day${DAY}/problem${PART}.js`;

    // run file at the path
    console.time('Solve!');
    require(path);
    console.timeEnd('Solve!');
} else {
    let data = fr.getInputForFunction(YEAR, DAY);

    // Get the path to the solution file
    const path = `../${YEAR}/js/Day${DAY}/problem${PART}.js`;
    const { solve } = require(path);

    // run file at the path
    const timerKey = `Solve! ${YEAR} Day ${DAY} Part ${PART}`;
    console.time(timerKey);
    let answer = solve(data);
    console.timeEnd(timerKey);

    OUTPUT.output(YEAR, DAY, PART, answer.value, answer.strategy);
}
