module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function getValue(param) {
        if (Number.isInteger(param)) {
            return param;
        } else {
            return registers[param];
        }
    }

    lines = lines.map((line) => {
        return line.split(' ').map((value) => {
            let numValue = Number(value);
            return Number.isInteger(numValue) ? numValue : value;
        });
    });

    let registers = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };
    let mulCalls = 0;

    let i = 0;
    while (i >= 0 && i < lines.length) {
        const [instruction, param1, param2] = lines[i];
        switch (instruction) {
            case 'set':
                registers[param1] = getValue(param2);
                break;
            case 'sub':
                registers[param1] -= getValue(param2);
                break;
            case 'mul':
                registers[param1] *= getValue(param2);
                mulCalls++;
                break;
            case 'jnz':
                if (getValue(param1) !== 0) {
                    i += getValue(param2);
                    continue;
                }
                break;
        }
        i++;
    }

    return { value: mulCalls };
}
