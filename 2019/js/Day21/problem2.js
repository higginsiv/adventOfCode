module.exports = { solve: solve };
const { IntCode } = require('../common/IntCode.js');

function solve({ lines, rawData }) {
    let ic = new IntCode(rawData, null, 0, [], []);
    ic.addAsciiInput([
        'NOT A J',
        'NOT B T',
        'OR T J',
        'NOT C T',
        'OR T J',
        'AND D J',
        'NOT I T',
        'NOT T T',
        'OR F T',
        'AND E T',
        'OR H T',
        'AND T J',
        'RUN',
    ]);
    const { output } = ic.run();
    const answer = output.pop();
    return { value: answer };
}
