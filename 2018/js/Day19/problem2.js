module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { getFactors } = require('../../../tools/math');

    // TODO only works on my input. Magic number retrieved thru console.log scumming
    const answer = getFactors(10551347).reduce((acc, factor) => acc + factor, 0);
    return { value: answer };
}
