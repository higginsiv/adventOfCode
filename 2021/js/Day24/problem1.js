module.exports = { solve: solve };
const EOL = require('os').EOL;
const {floor} = Math;

function solve({ lines, rawData }) {
    let params = getParams(lines);
    console.log(params)
    let registers = [0, 0, 0, 0];
    let cache = new Map();

    let blockNum = 0;
    let modelNumber = new Array(14).fill(9);

    // findModelNumber(blockNum, params, registers, cache, modelNumber);

    const answer = modelNumber.join('');
    return { value: answer };
}

function findModelNumber(modelNumberIndex, params, registers, cache, modelNumber) {
    if (modelNumberIndex === 14) {
        return registers[3] === 0;
    }

    for (let i = 9; i > 0; i--) {
        let inputRegisters = [...registers];
        inputRegisters[0] = i;
        let newRegisters = process(modelNumberIndex, params, inputRegisters, cache);
        if (findModelNumber(modelNumberIndex + 1, params, newRegisters, cache)) {
            modelNumber[modelNumberIndex] = i;
            return true;
        }
    }
    return false;
}

function process(blockNum, params, registers, cache) {
    // const key = getKey(blockNum, registers);
    // if (cache.has(key)) {
    //     return cache.get(key);
    // }

    let paramsBlock = params[blockNum];
    let newRegisters = processBlock(paramsBlock, registers);
    // cache.set(key, newRegisters);
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