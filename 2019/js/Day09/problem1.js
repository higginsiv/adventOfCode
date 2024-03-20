module.exports = {solve: solve};
const { IntCode } = require('../common/IntCode2.js');

function solve({lines, rawData}) {
    const answer = new IntCode(rawData, new Map(), 0, [1], []).run().output.pop();
    return {value: answer};
}