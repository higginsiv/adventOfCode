import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    rawData = rawData.split(EOL + EOL);
    let registers = rawData[0].split(EOL).map((line) => {
        return line.match(/\d+/g).map(Number)[0];
    });
    registers = {
        a: registers[0],
        b: registers[1],
        c: registers[2],
    };

    let instructions = rawData[1].split(EOL).map((line) => {
        return line.match(/\d+/g).map(Number);
    })[0];

    let ip = 0;
    let out = [];
    while (ip < instructions.length) {
        switch (instructions[ip]) {
            case 0:
                registers.a = Math.trunc(
                    registers.a / Math.pow(2, getComboValue(instructions[ip + 1])),
                );
                ip += 2;
                break;
            case 1:
                registers.b = registers.b ^ instructions[ip + 1];
                ip += 2;
                break;
            case 2:
                registers.b = getComboValue(instructions[ip + 1]) % 8;
                ip += 2;
                break;
            case 3:
                if (registers.a === 0) {
                    ip += 2;
                } else {
                    ip = instructions[ip + 1];
                }
                break;
            case 4:
                registers.b = registers.b ^ registers.c;
                ip += 2;
                break;
            case 5:
                out.push(getComboValue(instructions[ip + 1]) % 8);
                ip += 2;
                break;
            case 6:
                registers.b = Math.trunc(
                    registers.a / Math.pow(2, getComboValue(instructions[ip + 1])),
                );
                ip += 2;
                break;
            case 7:
                registers.c = Math.trunc(
                    registers.a / Math.pow(2, getComboValue(instructions[ip + 1])),
                );
                ip += 2;
                break;
        }
    }

    const answer = out.join();
    return new Solution(answer);

    function getComboValue(value) {
        if (value <= 3) {
            return value;
        }
        if (value === 4) {
            return registers.a;
        }
        if (value === 5) {
            return registers.b;
        }
        if (value === 6) {
            return registers.c;
        }
        console.log('Error: getValue()', value);
    }
}
