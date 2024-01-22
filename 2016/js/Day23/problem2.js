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
            console.log('----instruction', i, instruction, param1, param2)
        }
    }
    // todo this doesn't work because the instructions are going in reverse. Instructions that are supposed to go first might impact
    // future ones. For example something like this:
    // cpy b c
    // inc a
    // dec c
    // jnz c -3
    function multiply(
        lines,
        start,
        backwardSteps,
        multiplier,
        localRegisters = { a: 0, b: 0, c: 0, d: 0 }
    ) {
        console.log('multiply', start, backwardSteps, multiplier);
        let i = start - 1;

        while (i >= start - backwardSteps) {
            let [instruction, param1, param2] = lines[i];
            console.log('----instruction', i, instruction, param1, param2)
            if (instruction === 'inc') {
                // console.log('----inc', i, instruction, param1, param2, getValue(param1), getValue(param2))
                // console.log('------localRegisters', localRegisters)
                // console.log('------multiplier', multiplier)
                registers[param1] += multiplier;
                // console.log('------localRegisters', localRegisters)

            } else if (instruction === 'dec') {
                // console.log('----dec', i, instruction, param1, param2, getValue(param1), getValue(param2))
                // console.log('------localRegisters', localRegisters)
                // console.log('------multiplier', multiplier)
                registers[param1] -= multiplier;
                // console.log('------localRegisters', localRegisters)

            } else if (instruction === 'jnz' && !Number.isInteger(param1) && getValue(param1) !== 0) {
                console.log('----jnz', i, instruction, param1, param2)
                if (getValue(param1) > 0) {
                    console.log('pozzy')
                    process.exit();
                }
                multiply(
                    lines,
                    i,
                    -1*getValue(param2),
                    multiplier * getValue(param1),
                    localRegisters
                );
                i += getValue(param2);
            } else if (instruction === 'cpy') {
                // Note: including the cpy is necessary to reset the inner loop
                console.log('----cpy', i, instruction, param1, param2, getValue(param1), getValue(param2));
                registers[param2] = getValue(param1);
            } else {
                console.log('----break', i, instruction, param1, param2, getValue(param1), getValue(param2));
            }
            i--;
        }

        return localRegisters;
    }

    lines = lines.map((line) =>
        line.split(' ').map((value) => {
            let numValue = Number(value);
            return Number.isInteger(numValue) ? numValue : value;
        })
    );

    let registers = { a: 7, b: 0, c: 0, d: 0 };
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
                    multiply(lines, i, -1* getValue(param2), getValue(param1));
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
