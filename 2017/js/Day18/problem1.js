module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function getValue(param) {
        if (registers[param] !== undefined) {
            return registers[param];
        }
        return param;
    }

    let registers = {};
    let sounds = [];

    lines = lines.map((line) => {
        const parts = line.split(' ').map((part, index) => {
            let value = parseInt(part);
            if (Number.isInteger(value)) {
                return value;
            }
            if (index > 0) {
                registers[part] = 0;
            }
            return part;
        });
        return {
            instruction: parts[0],
            param1: parts[1],
            param2: parts[2],
        };
    });

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const { instruction, param1, param2 } = line;
        switch (instruction) {
            case 'snd':
                sounds.push(getValue(param1));
                break;
            case 'set':
                registers[param1] = getValue(param2);
                break;
            case 'add':
                registers[param1] += getValue(param2);
                break;
            case 'mul':
                registers[param1] *= getValue(param2);
                break;
            case 'mod':
                registers[param1] %= getValue(param2);
                break;
            case 'rcv':
                if (registers[param1] !== 0) {
                    return { value: sounds[sounds.length - 1] };
                }
                break;
            case 'jgz':
                if (getValue(param1) > 0) {
                    i += getValue(param2) - 1;
                }
                break;
        }
        i++;
    }

    return { value: null };
}
