const OP_1 = 1;
const OP_2 = 2;
const OP_3 = 3;
const OP_4 = 4;
const OP_5 = 5;
const OP_6 = 6;
const OP_7 = 7;
const OP_8 = 8;
const OP_9 = 9;
const OP_99 = 99;

const [DEFAULT_MODE, POSITION, IMMEDIATE, RELATIVE] = [0, 0, 1, 2];

const DEFAULT_MEMORY_VALUE = 0;

class IntCode {
    memory;
    pointer;
    constructor(rawData, modifications, pointer) {
        this.memory = rawData.split(',').map((x) => Number(x));
        for (let [key, value] of modifications.entries()) {
            this.memory[key] = value;
        }
        this.pointer = pointer;
    }

    run() {
        let pointer = this.pointer;
        let memory = this.memory;
        let [opCode, parameterModes] = this.getOpCodeAndParameterModes(pointer, memory);
        let increment = 0;
        while (opCode !== OP_99) {
            switch (opCode) {
                case OP_1:
                    this.add(pointer, memory, parameterModes);
                    increment = 4;
                    break;
                case OP_2:
                    this.mult(pointer, memory, parameterModes);
                    increment = 4;
                    break;
                case OP_3:
                    break;
                case OP_4:
                    break;
                case OP_99:
                    break;
            }

            if (opCode !== OP_99) {
                pointer += increment;
                opCode = memory[pointer];
            }
        }

        return memory;
    }

    getOpCodeAndParameterModes(pointer, memory) {
        let values = String(memory[pointer]).split('').map((x) => Number(x));
        const opCode = values.pop();
        return [opCode, values];
    }

    getParameterValue(pointer, memory, modes) {
        let mode;
        if (modes && modes.length > 0) {
            mode = modes.shift();
        } else {
            mode = DEFAULT_MODE;
        }

        switch (mode) {
            case POSITION:
                return memory[pointer];
            case IMMEDIATE:
                return pointer;
        }
    }

    getValueAtLocation(pos, memory) {
        const value = memory[pos];
        return value ?? DEFAULT_MEMORY_VALUE;
    }

    add(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes);
        let dest = this.getParameterValue(pointer + 3, memory, modes);
        memory[dest] = this.getValueAtLocation(pos1, memory) + this.getValueAtLocation(pos2, memory);
    }

    mult(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory);
        let pos2 = this.getParameterValue(pointer + 2, memory);
        let dest = this.getParameterValue(pointer + 3, memory);
        memory[dest] = this.getValueAtLocation(pos1, memory) * this.getValueAtLocation(pos2, memory);
    }
}

module.exports = {
    IntCode: IntCode,
};