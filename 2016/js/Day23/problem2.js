module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function validateInstruction(instruction, param1, param2) {
        switch (instruction) {
            case 'cpy':
                return !Number.isInteger(param2);
            case 'inc':
                return !Number.isInteger(param1);
            case 'dec':
                return !Number.isInteger(param1);
            case 'jnz':
                return true;
            case 'tgl':
                return true;
            default:
                return false;
        }
    }

    function getValue(param) {
        if (Number.isInteger(param)) {
            return param;
        } else {
            return registers[param];
        }
    }

    function multiply2(lines, start, backwardSteps, multiplier) {
        let i = start - backwardSteps;

        while (i < start) {
            let [instruction, param1, param2] = lines[i];
                // Todo validate instructions

            console.log('----instruction', i, instruction, param1, param2)
            if (instruction === 'cpy') {
                registers[param2] = getValue(param1);
            } else if (instruction === 'inc') {
                registers[param1] += multiplier;
            } else if (instruction === 'dec') {
                if (i === start - 1) {
                    registers[param1] = 0;
                } else {
                    registers[param1]--;
                }
            } else if (instruction === 'jnz' && !Number.isInteger(param1) && getValue(param1) !== 0) {
                // if (getValue(param1) > 0) {
                //     console.log('pozzy')
                //     process.exit();
                // }
                multiply2(
                    lines,
                    i,
                    -1*getValue(param2),
                    multiplier * getValue(param1)                );
            } else {
                console.log('----break', i, instruction, param1, param2, getValue(param1), getValue(param2));
            }
            i++;
        }
    }

    lines = lines.map((line) =>
        line.split(' ').map((value) => {
            let numValue = Number(value);
            return Number.isInteger(numValue) ? numValue : value;
        })
    );

    let registers = { a: 12, b: 0, c: 0, d: 0 };
    let i = 0;

    while (true) {
        if (i < 0 || i >= lines.length) {
            break;
        }

        const [instruction, param1, param2] = lines[i];
        if (!validateInstruction(instruction, param1, param2)) {
            i++;
            continue;
        }

        switch (instruction) {
            case 'cpy':
                registers[param2] = getValue(param1);
                i++;
                break;
            case 'inc':
                registers[param1]++;
                i++;
                break;
            case 'dec':
                registers[param1]--;
                i++;
                break;
            case 'jnz':
                if (!Number.isInteger(param1) && getValue(param1) !== 0) {
                    multiply2(lines, i, -1* getValue(param2), getValue(param1));
                    // registers.a += localRegisters.a;
                    // registers.b += localRegisters.b;
                    // registers.c += localRegisters.c;
                    // registers.d += localRegisters.d;
                    i++;
                } else if (getValue(param1) !== 0) {
                    i += getValue(param2);
                } else {
                    i++;
                }
                break;
            case 'tgl':
                let instructionToToggle = i + registers[param1];
                if (
                    instructionToToggle >= 0 &&
                    instructionToToggle < lines.length
                ) {
                    let toggledInstruction = lines[instructionToToggle];
                    if (toggledInstruction.length === 2) {
                        toggledInstruction[0] =
                            toggledInstruction[0] === 'inc' ? 'dec' : 'inc';
                    } else {
                        toggledInstruction[0] =
                            toggledInstruction[0] === 'jnz' ? 'cpy' : 'jnz';
                    }
                }
                i++;
                break;
        }
    }

    let answer = registers['a'];
    return { value: answer };
}

// a = 0;
// b = 3;
// a++;
// b--;
// repeat until b = 0;

// 0, 3
// 1,2
// 2,1
// 3,0

// 1 + 2(1)

// a = 0;
// b = 3;
// c = 3;

// b = 3;
// a++;
// b--;
// repeat until b = 0;
// a++;
// c--;
// repeat until c = 0;

// 0, 3, 3
// 1, 2, 3
// 2, 1, 3
// 3, 0, 3
// 4, 0, 2
// 4, 3, 2
// 5, 2, 2
// 6, 1, 2
// 7, 0, 2
// 8, 0, 1
