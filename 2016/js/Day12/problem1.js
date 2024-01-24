module.exports = { solve: solve };

function solve({ lines, rawData }) {
    lines = lines.map((line) =>
        line.split(' ').map((value) => {
            let numValue = Number(value);
            return Number.isInteger(numValue) ? numValue : value;
        }),
    );

    let registers = { a: 0, b: 0, c: 0, d: 0 };
    let i = 0;

    while (true) {
        if (i < 0 || i >= lines.length) {
            break;
        }

        const [instruction, param1, param2] = lines[i];

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
                registers[param1]++;
                i++;
                break;
            case 'dec':
                registers[param1]--;
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
                    i += parseInt(param2);
                } else {
                    i++;
                }
                break;
        }
    }

    let answer = registers['a'];
    return { value: answer };
}
