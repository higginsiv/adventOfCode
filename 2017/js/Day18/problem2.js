module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [A, B] = [0, 1];

    function getValue(param, registers) {
        if (registers[param] !== undefined) {
            return registers[param];
        }
        return param;
    }

    function processLine(mode) {
        let { i, input, output, registers } = info.get(mode);

        const line = lines[i];
        const { instruction, param1, param2 } = line;
        switch (instruction) {
            case 'snd':
                output.push(getValue(param1, registers));
                if (mode === B) {
                    bSendsValue++;
                }
                return { i: i + 1, mode, input, output, registers };
            case 'set':
                registers[param1] = getValue(param2, registers);
                return { i: i + 1, mode, input, output, registers };
            case 'add':
                registers[param1] += getValue(param2, registers);
                return { i: i + 1, mode, input, output, registers };
            case 'mul':
                registers[param1] *= getValue(param2, registers);
                return { i: i + 1, mode, input, output, registers };
            case 'mod':
                registers[param1] %= getValue(param2, registers);
                return { i: i + 1, mode, input, output, registers };
            case 'rcv':
                if (input.length > 0) {
                    registers[param1] = input.shift();
                    return { i: i + 1, mode, input, output, registers };
                }
                return { i, mode, waiting: true, input, output, registers };
            case 'jgz':
                if (getValue(param1, registers) > 0) {
                    return { i: i + getValue(param2, registers), mode, input, output, registers };
                }
                return { i: i + 1, mode, input, output, registers };
        }
    }

    let registers = {};

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

    let bSendsValue = 0;
    let info = new Map();
    let aOutput = [];
    let bOutput = [];
    info.set(A, { i: 0, input: bOutput, output: aOutput, registers: registers });
    info.set(B, { i: 0, input: aOutput, output: bOutput, registers: { ...registers, p: 1 } });
    let aTerminated = false;
    let bTerminated = false;

    let mode = A;
    while (true) {
        const result = processLine(mode);
        info.set(mode, result);

        if (result.i >= lines.length || result.i < 0) {
            if (mode === A) {
                aTerminated = true;
                mode = B;
            } else {
                bTerminated = true;
                mode = A;
            }
        }

        if (aTerminated && bTerminated) {
            break;
        }

        if (result.waiting) {
            if ((aOutput.length === 0 || bTerminated) && (bOutput.length === 0 || aTerminated)) {
                break;
            }
            if (mode === A) {
                mode = B;
            } else {
                mode = A;
            }
        }
    }

    return { value: bSendsValue };
}
