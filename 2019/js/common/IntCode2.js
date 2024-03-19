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
    input;
    output;
    constructor(rawData, modifications, pointer, input = [], output = []) {
        this.memory = rawData.split(',').map((x) => Number(x));
        for (let [key, value] of modifications.entries()) {
            this.memory[key] = value;
        }
        this.pointer = pointer;
        this.input = input;
        this.output = output;
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
                    this.saveInput(pointer, memory, parameterModes, this.input);
                    increment = 2;
                    break;
                case OP_4:
                    this.postOutput(pointer, memory, parameterModes, this.output);
                    increment = 2;
                    break;
                case OP_99:
                    break;
            }

            if (opCode !== OP_99) {
                pointer += increment;
                [opCode, parameterModes] = this.getOpCodeAndParameterModes(pointer, memory);
            }
        }

        return {
            memory: memory,
            input: this.input,
            output: this.output,
        };
    }

    getOpCodeAndParameterModes(pointer, memory) {        
        let values = String(memory[pointer]).split('').map((x) => Number(x));
        let opCode;
        if (values.length === 1) {
            opCode = values.pop();
        } else {
            opCode = values.pop() + 10 * values.pop();
        }
        return [opCode, values];
    }

    getParameterValue(pointer, memory, modes, invalidModes = []) {
        let mode;
        if (modes && modes.length > 0) {
            mode = modes.pop();
        } else {
            mode = DEFAULT_MODE;
        }

        if (invalidModes.includes(mode)) {
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
        let dest = this.getParameterValue(pointer + 3, memory, modes, [IMMEDIATE]);
        memory[dest] = this.getValueAtLocation(pos1, memory) + this.getValueAtLocation(pos2, memory);
    }

    mult(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes);
        let dest = this.getParameterValue(pointer + 3, memory, modes, [IMMEDIATE]);
        memory[dest] = this.getValueAtLocation(pos1, memory) * this.getValueAtLocation(pos2, memory);
    }

    saveInput(pointer, memory, modes, input) {
        let pos = this.getParameterValue(pointer + 1, memory, modes, [IMMEDIATE]);
        memory[pos] = input.shift();
    } 

    postOutput(pointer, memory, modes, output) {
        let pos = this.getParameterValue(pointer + 1, memory, modes);
        output.push(this.getValueAtLocation(pos, memory));
    }
}

module.exports = {
    IntCode: IntCode,
};