// Get year, day, and part from arguments
const [YEAR, DAY, PART] = process.argv.slice(2);

// Get the path to the solution file
const path = `./${YEAR}/js/Day${DAY}/problem${PART}.js`;

// run file at the path
require(path);
