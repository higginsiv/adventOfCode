// Get year, day, and part from arguments
const [YEAR, DAY, PART] = process.argv.slice(2);

if (!YEAR || !DAY || !PART) {
    console.error('Usage: node solve.js <year> <day> <part>');
    process.exit(1);
}

// Get the path to the solution file
const path = `../${YEAR}/js/Day${DAY}/problem${PART}.js`;

// run file at the path
console.time('Solve!');
require(path);
console.timeEnd('Solve!');
