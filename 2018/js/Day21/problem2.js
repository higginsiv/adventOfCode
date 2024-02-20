module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const {
        addi,
        addr,
        bani,
        banr,
        bori,
        borr,
        eqir,
        eqri,
        eqrr,
        gtri,
        gtir,
        gtrr,
        muli,
        mulr,
        seti,
        setr,
    } = require('../Day16/problem1');
    const operations = {
        addi,
        addr,
        bani,
        banr,
        bori,
        borr,
        eqir,
        eqri,
        eqrr,
        gtri,
        gtir,
        gtrr,
        muli,
        mulr,
        seti,
        setr,
    };

    function getNextHalt(input) {
        let y = input | 65536;
        let x = 1855046;

        while (y > 0) {
            x = (((x + (y & 255)) & 16777215) * 65899) & 16777215;
            y >>= 8;
        }

        return x;
    }

    let haltNums = [];

    const registers = [0, 0, 0, 0, 0, 0];

    let start = 9079325; // answer from p1 was minimum

    while (true) {
        let next = getNextHalt(start);
        if (haltNums.includes(next)) {
            break;
        }
        haltNums.push(next);
        start = next;
    }

    const answer = haltNums[haltNums.length - 1];
    return { value: answer };
}
