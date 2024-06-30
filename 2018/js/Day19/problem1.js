import {
    addr,
    addi,
    mulr,
    muli,
    banr,
    bani,
    borr,
    bori,
    setr,
    seti,
    gtir,
    gtri,
    gtrr,
    eqir,
    eqri,
    eqrr,
} from '../Day16/problem1.js';
export default function solve({ lines, rawData }) {
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

    const registers = [0, 0, 0, 0, 0, 0];
    const instructionPointer = Number(lines[0].split(' ')[1]);
    const instructions = lines.slice(1).map((line) => {
        const [op, a, b, c] = line.split(' ');
        return { op, a: Number(a), b: Number(b), c: Number(c) };
    });

    while (registers[instructionPointer] < instructions.length) {
        const { op, a, b, c } = instructions[registers[instructionPointer]];
        operations[op](registers, a, b, c);
        registers[instructionPointer]++;
    }

    const answer = registers[0];
    return { value: answer };
}
