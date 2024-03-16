module.exports = { solve: solve };
const EOL = require('os').EOL;
const {floor} = Math;

function solve({ lines, rawData }) {
    let params = getParams(lines);
    console.log(params);
    // NOTES:
    // - 14 blocks that are mostly the same except for 2-3 integers
    // can I memoize the results of x number at y depth to save time?
    const answer = null;
    return { value: answer };
}

function process(blockNum, params, registers, cache) {
    const key = getKey(blockNum, registers);
    if (cache.has(key)) {
        return cache.get(key);
    }

    let paramsBlock = params[blockNum];
    let newRegisters = processBlock(paramsBlock, registers);
    cache.set(key, newRegisters);
    return newRegisters;
}

function processBlock(params, registers) {
    let [w, x, y, z] = registers;
    x = x % 26;
    z = floor(z / params.param1);
    x += params.param2;
    x = x !== w ? 1 : 0;
    z *= (25 * x + 1);
    y = (w + params.param3) * x;
    z += y;
    return [w, x, y, z];
}

function getParams(lines) {
    let params = [];
    let p1 = 4;
    let p2 = 5;
    let p3 = 15;

    while (p1 < lines.length) {
        params.push({
            param1: Number(lines[p1].split(' ')[2]),
            param2: Number(lines[p2].split(' ')[2]),
            param3: Number(lines[p3].split(' ')[2]),
        });
        p1 += 18;
        p2 += 18;
        p3 += 18;
    }

    return params;
}

function getKey(blockNum, registers) {
    return `${blockNum}-${registers.join('-')}`;
}