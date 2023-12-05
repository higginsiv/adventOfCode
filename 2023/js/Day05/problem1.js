const fr = require('../../../tools/fileReader');
const EOL = require('os').EOL;
const [YEAR, DAY, PART] = ['2023', '05', '1'];
const DATA = fr.getInput(YEAR, DAY, EOL + EOL);

let seeds = DATA[0].match(/\d+/g).map((x) => parseInt(x));

let mappings = [];

for (let i = 1; i < DATA.length; i++) {
    mappings.push(buildMapping(DATA[i]));
}

seeds = seeds.map((seed) => {
    mappings.forEach((mapp) => {
        seed = findMapping(mapp, seed);
    });
    return seed;
});

function buildMapping(dataString) {
    let mapping = dataString.split(EOL);
    mapping.shift();
    mapping = mapping.map((line) => line.match(/\d+/g).map((x) => parseInt(x)));
    return mapping;
}

function findMapping(mapp, seed) {
    let newSeed = seed;
    for (let i = 0; i < mapp.length; i++) {
        const [DEST_RANGE_START, SOURCE_RANGE_START, RANGE_LENGTH] = mapp[i];
        if (
            seed >= SOURCE_RANGE_START &&
            seed <= SOURCE_RANGE_START + RANGE_LENGTH
        ) {
            newSeed = DEST_RANGE_START + (seed - SOURCE_RANGE_START);
            return newSeed;
        }
    }

    return newSeed;
}

let answer = seeds.reduce((a, b) => a < b ? a : b, Infinity);
console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);