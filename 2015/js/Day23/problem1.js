module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const DATA = lines.map((line) => {
        const [instruction, register, offset] = line.split(' ');

        if (instruction === 'jmp') {
            return {
                instruction,
                offset: parseInt(register),
            };
        }

        return {
            instruction,
            register: register.replace(',', ''),
            offset: parseInt(offset),
        };
    });

    let pointer = 0;
    let registers = { a: 0, b: 0 };

    while (pointer < DATA.length && pointer >= 0) {
        const { instruction, register, offset } = DATA[pointer];
        switch (instruction) {
            case 'hlf':
                registers[register] /= 2;
                pointer++;
                break;
            case 'tpl':
                registers[register] *= 3;
                pointer++;
                break;
            case 'inc':
                registers[register]++;
                pointer++;
                break;
            case 'jmp':
                pointer += offset;
                break;
            case 'jie':
                if (registers[register] % 2 === 0) {
                    pointer += offset;
                } else {
                    pointer++;
                }
                break;
            case 'jio':
                if (registers[register] === 1) {
                    pointer += offset;
                } else {
                    pointer++;
                }
                break;
        }
    }

    const answer = registers['b'];
    return { value: answer };
}
