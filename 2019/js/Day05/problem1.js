module.exports = {solve: solve};
const {IntCode} = require('../common/IntCode2.js');

function solve({lines, rawData}) {
    let output = new IntCode(rawData, new Map(), 0, [1], []).run().output;
    return {value: output[output.length - 1]};
}