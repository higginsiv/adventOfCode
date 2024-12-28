import { Solution } from '#tools/solution.js';
import exp from 'constants';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    rawData = rawData.split(EOL + EOL);
    let baseRegisters = rawData[0].split(EOL).map((line) => {
        return line.match(/\d+/g).map(Number)[0];
    });
    baseRegisters = {
        a: baseRegisters[0],
        b: baseRegisters[1],
        c: baseRegisters[2],
    };

    let instructions = rawData[1].split(EOL).map((line) => {
        return line.match(/\d+/g).map(Number);
    })[0];

    let workingAs = [];
    let expectedOut = instructions.join();
    buildA(0);

    const answer = workingAs.sort((a, b) => a - b)[0];
    return new Solution(answer);

    function buildA(goalAfterTruncation) {
        for (let i = 0; i < 8; i++) {
            if (goalAfterTruncation === 0 && i === 0) {
                continue;
            }
            let possible = goalAfterTruncation * 8 + i;
            let out = simulate(possible, baseRegisters.b, baseRegisters.c);
            let outStr = out.join();
            if (expectedOut.endsWith(outStr) && outStr.length <= expectedOut.length) {
                if (outStr === expectedOut) {
                    workingAs.push(possible);
                    continue;
                }
                buildA(possible);
            }
        }
    }

    function simulate(a, b, c) {
        let registers = { a, b, c };
        let ip = 0;
        let out = [];
        while (ip < instructions.length) {
            switch (instructions[ip]) {
                case 0:
                    registers.a = Math.trunc(
                        registers.a / Math.pow(2, getComboValue(instructions[ip + 1], registers)),
                    );
                    ip += 2;
                    break;
                case 1:
                    registers.b = xor(registers.b,instructions[ip + 1]);
                    ip += 2;
                    break;
                case 2:
                    registers.b = getComboValue(instructions[ip + 1], registers) % 8;
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
                    registers.b = xor(registers.b, registers.c);
                    ip += 2;
                    break;
                case 5:
                    out.push(getComboValue(instructions[ip + 1], registers) % 8);
                    ip += 2;
                    break;
                case 6:
                    registers.b = Math.trunc(
                        registers.a / Math.pow(2, getComboValue(instructions[ip + 1], registers)),
                    );
                    ip += 2;
                    break;
                case 7:
                    registers.c = Math.trunc(
                        registers.a / Math.pow(2, getComboValue(instructions[ip + 1], registers)),
                    );
                    ip += 2;
                    break;
            }
        }
        return out;
    }
    function getComboValue(value, registers) {
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

    function xor(a, b) {
        // Convert numbers to binary strings
        const aBin = a.toString(2);
        const bBin = b.toString(2);

        // Pad the shorter string with leading zeros
        const maxLength = Math.max(aBin.length, bBin.length);
        const aPadded = aBin.padStart(maxLength, '0');
        const bPadded = bBin.padStart(maxLength, '0');

        // Perform XOR operation bit by bit
        let result = '';
        for (let i = 0; i < maxLength; i++) {
            result += aPadded[i] === bPadded[i] ? '0' : '1';
        }

        // Convert the result back to a number
        return parseInt(result, 2);
    }
}

// 2,4,1,5,7,5,4,5,0,3,1,6,5,5,3,0
// b = a % 8
// b = b XOR 5
// c = trunc(a / 2^b)
// b = b XOR c
// a = trunc(a / 8)
// b = b XOR 6
// OUT = c % 8
// if (a === 0) end else start over

// n >> 3 = 0 ... 0 <= n <= 7
// n >> 3 = 0..7 ... 8 <= n <= 63
// n >> 3 = 0..63 ... 64 <= n <= 511

// 109019930332929 too high
// 109019930332929
