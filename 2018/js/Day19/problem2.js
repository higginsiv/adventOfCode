module.exports = {solve: solve};

function solve({lines, rawData}) {
    function getKey(registers, index) {
        return `${index}-${registers.join(',')}`;
    }

    const {addi, addr, bani, banr, bori, borr, eqir, eqri, eqrr, gtri, gtir, gtrr, muli, mulr, seti, setr} = require('../Day16/problem1');
    const operations = {addi, addr, bani, banr, bori, borr, eqir, eqri, eqrr, gtri, gtir, gtrr, muli, mulr, seti, setr};

    const registers = [1, 0, 0, 0, 0, 0];
    const instructionPointer = Number(lines[0].split(' ')[1]);
    const instructions = lines.slice(1).map(line => {
        const [op, a, b, c] = line.split(' ');
        return {op, a: Number(a), b: Number(b), c: Number(c)};
    });

    let results = new Map();
    while (registers[instructionPointer] < instructions.length) {
        const {op, a, b, c} = instructions[registers[instructionPointer]];
        operations[op](registers, a, b, c);
        registers[instructionPointer]++;
    }

    const answer = registers[0];
    return {value: answer};
}