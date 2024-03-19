module.exports = { solve: solve };
const { IntCode } = require('../common/IntCode2.js');

function solve({ lines, rawData }) {
    let answer;
    const goal = 19690720;

    outer: for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let replacements = new Map([
                [1, i],
                [2, j],
            ]);
            answer = new IntCode(rawData, replacements, 0).run()[0];
            if (answer === goal) {
                answer = 100 * i + j;
                break outer;
            }
        }
    }

    return { value: answer };
}
