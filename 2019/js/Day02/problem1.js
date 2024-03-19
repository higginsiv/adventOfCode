module.exports = {solve: solve};
const {IntCode} = require('../common/IntCode2.js');

function solve({lines, rawData}) {
    let replacements = new Map([[1, 12], [2, 2]]);
    const answer = new IntCode(rawData, replacements, 0).run().memory[0];
    return {value: answer};
}