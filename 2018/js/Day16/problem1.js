import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    let tests = rawData
        .split(EOL + EOL + EOL + EOL)[0]
        .split(EOL + EOL)
        .map((test) => {
            let [before, instruction, after] = test.split(EOL);
            before = before.match(/\d+/g).map(Number);
            instruction = instruction.split(' ').map(Number);
            after = after.match(/\d+/g).map(Number);
            possibleOpcodes = [];
            return { before, instruction, after, possibleOpcodes };
        });

    let opcodes = [
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
    ];

    tests.forEach((test) => {
        let [opcode, a, b, c] = test.instruction;

        opcodes.forEach((opcode, index) => {
            if (
                opcode(test.before.slice(), a, b, c).every(
                    (value, index) => value === test.after[index],
                )
            ) {
                test.possibleOpcodes.push(index);
            }
        });
    });

    const answer = tests.reduce((acc, test) => {
        return acc + (test.possibleOpcodes.length >= 3 ? 1 : 0);
    }, 0);

    return { value: answer };
}

export function addr(registers, a, b, c) {
    registers[c] = registers[a] + registers[b];
    return registers;
}

export function addi(registers, a, b, c) {
    registers[c] = registers[a] + b;
    return registers;
}

export function mulr(registers, a, b, c) {
    registers[c] = registers[a] * registers[b];
    return registers;
}

export function muli(registers, a, b, c) {
    registers[c] = registers[a] * b;
    return registers;
}

export function banr(registers, a, b, c) {
    registers[c] = registers[a] & registers[b];
    return registers;
}

export function bani(registers, a, b, c) {
    registers[c] = registers[a] & b;
    return registers;
}

export function borr(registers, a, b, c) {
    registers[c] = registers[a] | registers[b];
    return registers;
}

export function bori(registers, a, b, c) {
    registers[c] = registers[a] | b;
    return registers;
}

export function setr(registers, a, b, c) {
    registers[c] = registers[a];
    return registers;
}

export function seti(registers, a, b, c) {
    registers[c] = a;
    return registers;
}

export function gtir(registers, a, b, c) {
    registers[c] = a > registers[b] ? 1 : 0;
    return registers;
}

export function gtri(registers, a, b, c) {
    registers[c] = registers[a] > b ? 1 : 0;
    return registers;
}

export function gtrr(registers, a, b, c) {
    registers[c] = registers[a] > registers[b] ? 1 : 0;
    return registers;
}

export function eqir(registers, a, b, c) {
    registers[c] = a === registers[b] ? 1 : 0;
    return registers;
}

export function eqri(registers, a, b, c) {
    registers[c] = registers[a] === b ? 1 : 0;
    return registers;
}

export function eqrr(registers, a, b, c) {
    registers[c] = registers[a] === registers[b] ? 1 : 0;
    return registers;
}
