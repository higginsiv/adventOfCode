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

    lines = lines.map((line) => line.split(' ').map((value) => {
        let numValue = Number(value);
        return Number.isInteger(numValue) ? numValue : value;
    }));

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
                let valueToCopy;
                if (Number.isInteger(param1)) {
                    valueToCopy = param1;
                } else {
                    valueToCopy = registers[param1];
                }
                registers[param2] = valueToCopy;
                i++;
                break;
            case 'inc':
                registers[param1]++
                i++;
                break;
            case 'dec':
                registers[param1]--
                i++;
                break;
            case 'jnz':
                let shouldJump;
                if (Number.isInteger(param1)) {
                    shouldJump = param1;
                } else {
                    shouldJump = registers[param1];
                }

                if (shouldJump !== 0) {
                    if (Number.isInteger(param2)) {
                        i += param2;
                    } else {
                        i += registers[param2];
                    }
                } else {
                    i++;
                }
                break;
            case 'tgl':
                let instructionToToggle = i + registers[param1];
                if (instructionToToggle >= 0 && instructionToToggle < lines.length) {
                    let toggledInstruction = lines[instructionToToggle];
                    if (toggledInstruction.length === 2) {
                        toggledInstruction[0] = toggledInstruction[0] === 'inc' ? 'dec' : 'inc';
                    } else {
                        toggledInstruction[0] = toggledInstruction[0] === 'jnz' ? 'cpy' : 'jnz';
                    }
                }
                i++;
                break;
        }
    }

    let answer = registers['a'];
    return { value: answer };
}
