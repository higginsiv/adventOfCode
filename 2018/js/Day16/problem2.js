module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const {
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
    } = require('./problem1');
    const { EOL } = require('os');

    const opcodes = [
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

    const possibleOpcodes = Array.from({ length: opcodes.length }, (_, i) => i);

    let data = rawData.split(EOL + EOL + EOL + EOL);
    let tests = data[0].split(EOL + EOL).map((test) => {
        let [before, instruction, after] = test.split(EOL);
        before = before.match(/\d+/g).map(Number);
        instruction = instruction.split(' ').map(Number);
        after = after.match(/\d+/g).map(Number);
        return { before, instruction, after, possibleOpcodes: new Set(possibleOpcodes) };
    });

    let opcodeValueToIndex = new Map();

    tests.forEach((test) => {
        let [opcode, a, b, c] = test.instruction;

        test.possibleOpcodes.forEach((opcode, index) => {
            if (
                opcodes[opcode](test.before.slice(), a, b, c).some(
                    (value, index) => value !== test.after[index],
                )
            ) {
                test.possibleOpcodes.delete(index);
            }
        });
    });

    while (tests.some((test) => test.possibleOpcodes.size > 1)) {
        tests.forEach((test) => {
            test.possibleOpcodes = new Set(
                Array.from(test.possibleOpcodes).filter(
                    (opcode) => ![...opcodeValueToIndex.values()].includes(opcode),
                ),
            );
        });

        tests
            .filter((test) => test.possibleOpcodes.size == 1)
            .forEach((test) => {
                let opcode = test.possibleOpcodes.values().next().value;
                if (!opcodeValueToIndex.has(test.instruction[0])) {
                    opcodeValueToIndex.set(test.instruction[0], opcode);
                }
            });
    }

    let registers = [0, 0, 0, 0];
    let operations = data[1].split(EOL).map((line) => line.split(' ').map(Number));
    operations.forEach((operation) => {
        let [opcode, a, b, c] = operation;
        registers = opcodes[opcodeValueToIndex.get(opcode)](registers, a, b, c);
    });

    const answer = registers[0];
    return { value: answer };
}
