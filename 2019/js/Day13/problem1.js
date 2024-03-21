module.exports = { solve: solve };
const { IntCode } = require('../common/IntCode2.js');
const [EMPTY, WALL, BLOCK, HOR_PADDLE, BALL] = [0, 1, 2, 3, 4];

function solve({ lines, rawData }) {
    let ic = new IntCode(rawData, null, 0, [], []);
    const answer = ic
        .run()
        .output.filter((x, i) => i % 3 === 2 && x === BLOCK)
        .filter((x) => x === BLOCK).length;

    return { value: answer };
}
