export default function solve({ lines, rawData }) {
    const { max } = Math;
    let registers = {};
    lines.forEach((line) => {
        let [reg, op, val, , reg2, op2, val2] = line.split(' ');
        val = parseInt(val);
        val2 = parseInt(val2);

        if (!registers[reg]) {
            registers[reg] = 0;
        }
        if (!registers[reg2]) {
            registers[reg2] = 0;
        }

        let evaluation = false;
        switch (op2) {
            case '>':
                evaluation = registers[reg2] > val2;
                break;
            case '<':
                evaluation = registers[reg2] < val2;
                break;
            case '>=':
                evaluation = registers[reg2] >= val2;
                break;
            case '<=':
                evaluation = registers[reg2] <= val2;
                break;
            case '==':
                evaluation = registers[reg2] == val2;
                break;
            case '!=':
                evaluation = registers[reg2] != val2;
                break;
        }

        if (evaluation) {
            switch (op) {
                case 'inc':
                    registers[reg] += val;
                    break;
                case 'dec':
                    registers[reg] -= val;
                    break;
            }
        }
    });
    const answer = max(...Object.values(registers));
    return { value: answer };
}
