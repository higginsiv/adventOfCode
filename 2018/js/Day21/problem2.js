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
    const instructionPointer = Number(lines[0].split(' ')[1]);
    const instructions = lines.slice(1).map((line) => {
        const [op, a, b, c] = line.split(' ');
        return { op, a: Number(a), b: Number(b), c: Number(c) };
    });

    let haltNums = [];

    const registers = [0, 0, 0, 0, 0, 0];

    while (registers[instructionPointer] < instructions.length) {
        // TODO this is cheesed from my input
        if (registers[instructionPointer] === 28) {
            if (haltNums.includes(registers[4])) {
                break;
            }
            haltNums.push(registers[4]);
        }
        const { op, a, b, c } = instructions[registers[instructionPointer]];
        operations[op](registers, a, b, c);
        registers[instructionPointer]++;
    }

    const answer = haltNums[haltNums.length - 1];
    return { value: answer };
}
