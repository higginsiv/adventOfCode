module.exports = {solve: solve};

function solve({lines, rawData}) {
    const ic = require('../common/IntCode.js');
    let data = rawData.split(',').map((x) => BigInt(x));
    ic.run(data, 0n, [1n])
    const answer = null;
    return {value: answer};
}