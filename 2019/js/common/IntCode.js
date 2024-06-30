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

const WAITING = -1;

export default class IntCode {
    memory;
    pointer;
    input;
    output;
    relative = 0;
    singleTick = false;
    waitForInput = true;
    complete = false;
    // TODO this can be cleaner
    failedInput = false;
    // TODO make this constructor an object with named parameters
    constructor(rawData, modifications, pointer, input = [], output = [], singleTick = false, waitForInput = true) {
        this.memory = rawData.split(',').map((x) => Number(x));
        if (modifications) {
            for (let [key, value] of modifications.entries()) {
                this.memory[key] = value;
            }
        }

        this.pointer = pointer;
        this.input = input;
        this.output = output;
        this.singleTick = singleTick;
        this.waitForInput = waitForInput;
    }

    // Add lines of ASCII input to IC input
    addAsciiInput(inputLines) {
        inputLines.forEach(line => {
            this.input.push(...line.split('').map((char) => char.charCodeAt(0)));
            this.input.push(10);
        })
    }

    setState(state) {
        this.memory = state.memory;
        this.pointer = state.pointer;
    }

    isComplete() {
        return this.complete;
    }

    run() {
        // TODO do I need the second pointer variable?
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
                    let waiting = this.saveInput(
                        pointer,
                        memory,
                        parameterModes,
                        this.input
                    );

                    if (waiting === WAITING) {
                        return {
                            memory: memory,
                            input: this.input,
                            output: this.output,
                            pointer: pointer,
                            complete: this.complete,
                            waiting: true
                        };
                    }
                    increment = 2;
                    break;
                case OP_4:
                    this.postOutput(pointer, memory, parameterModes, this.output);
                    increment = 2;
                    break;
                case OP_5:
                    increment = this.jumpIfTrue(pointer, memory, parameterModes);
                    break;
                case OP_6:
                    increment = this.jumpIfFalse(pointer, memory, parameterModes);
                    break;
                case OP_7:
                    this.lessThan(pointer, memory, parameterModes);
                    increment = 4;
                    break;
                case OP_8:
                    this.equalTo(pointer, memory, parameterModes);
                    increment = 4;
                    break;
                case OP_9:
                    this.relative += this.getRelativeModifier(pointer, memory, parameterModes);
                    increment = 2;
                    break;
                case OP_99:
                    break;
                default:
                    throw new Error('Invalid opCode: ' + opCode);
            }

            if (opCode !== OP_99) {
                pointer += increment;
                [opCode, parameterModes] = this.getOpCodeAndParameterModes(pointer, memory);
            }

            if (this.singleTick) {
                this.pointer = pointer;
                return {
                    memory: memory,
                    input: this.input,
                    output: this.output,
                    pointer: pointer,
                    complete: this.complete,
                    waiting: false
                };
            }
        }

        this.complete = true;
        return {
            memory: memory,
            input: this.input,
            output: this.output,
            complete: this.complete,
        };
    }

    getOpCodeAndParameterModes(pointer, memory) {
        let values = String(memory[pointer])
            .split('')
            .map((x) => Number(x));
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
                return this.getValueAtLocation(pointer, memory);
            case IMMEDIATE:
                return pointer;
            case RELATIVE:
                return this.getValueAtLocation(pointer, memory) + this.relative;
        }
    }

    getValueAtLocation(pos, memory) {
        const value = memory[pos];
        return value ?? DEFAULT_MEMORY_VALUE;
    }

    add(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes, []);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes, []);
        let dest = this.getParameterValue(pointer + 3, memory, modes, [IMMEDIATE]);
        memory[dest] =
            this.getValueAtLocation(pos1, memory) + this.getValueAtLocation(pos2, memory);
    }

    mult(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes, []);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes, []);
        let dest = this.getParameterValue(pointer + 3, memory, modes, [IMMEDIATE]);
        memory[dest] =
            this.getValueAtLocation(pos1, memory) * this.getValueAtLocation(pos2, memory);
    }

    saveInput(pointer, memory, modes, input) {
        if (input.length === 0 && this.waitForInput) {
            return WAITING;
        }

        let pos = this.getParameterValue(pointer + 1, memory, modes, [IMMEDIATE]);

        let nextInput;
        if (input.length === 0) {
            nextInput = -1;
            this.failedInput = true;
        } else {
            nextInput = input.shift();
            this.failedInput = false;
        }

        memory[pos] = nextInput;
    }

    postOutput(pointer, memory, modes, output) {
        let pos = this.getParameterValue(pointer + 1, memory, modes, []);
        output.push(this.getValueAtLocation(pos, memory));
    }

    jumpIfTrue(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes, []);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes, []);
        if (this.getValueAtLocation(pos1, memory) !== 0) {
            return this.getValueAtLocation(pos2, memory) - pointer;
        }
        return 3;
    }

    jumpIfFalse(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes, []);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes, []);
        if (this.getValueAtLocation(pos1, memory) === 0) {
            return this.getValueAtLocation(pos2, memory) - pointer;
        }
        return 3;
    }

    lessThan(pointer, memory, modes) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes, []);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes, []);
        let dest = this.getParameterValue(pointer + 3, memory, modes, [IMMEDIATE]);
        if (this.getValueAtLocation(pos1, memory) < this.getValueAtLocation(pos2, memory)) {
            memory[dest] = 1;
        } else {
            memory[dest] = 0;
        }
    }

    equalTo(pointer, memory, modes, relative) {
        let pos1 = this.getParameterValue(pointer + 1, memory, modes, []);
        let pos2 = this.getParameterValue(pointer + 2, memory, modes, []);
        let dest = this.getParameterValue(pointer + 3, memory, modes, [IMMEDIATE]);
        if (this.getValueAtLocation(pos1, memory) === this.getValueAtLocation(pos2, memory)) {
            memory[dest] = 1;
        } else {
            memory[dest] = 0;
        }
    }

    getRelativeModifier(pointer, memory, modes) {
        let pos = this.getParameterValue(pointer + 1, memory, modes, []);
        return this.getValueAtLocation(pos, memory);
    }
}