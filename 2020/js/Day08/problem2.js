export default function solve({ lines, rawData }) {
    const [ACCUMULATE, JUMP, NONE] = ['acc', 'jmp', 'nop'];

    class Instruction {
        operation;
        argument;
        executed = false;
        constructor(command) {
            let [operation, argument] = command.split(' ');
            this.operation = operation;
            this.argument = parseInt(argument);
        }
    }

    class State {
        accumulator;
        index;
        instructions;
    }
    const data = lines.map((x) => new Instruction(x));

    let accumulator = 0;
    let index = 0;
    let visited = [];

    let fixed = JSON.parse(JSON.stringify(data));

    // generate list of possible instructions that need fixing
    while (true) {
        let instruction = fixed[index];
        visited.push(index);
        if (instruction.executed) {
            break;
        }
        instruction.executed = true;

        operate(instruction);
    }

    let ended = false;

    index = 0;
    accumulator = 0;
    // Attempt each potential fix and break when one terminates
    for (let i = 0; i < visited.length; i++) {
        if (ended) {
            break;
        }
        index = 0;
        accumulator = 0;
        fixed = JSON.parse(JSON.stringify(data));
        if (fixed[[visited[i]]].operation === ACCUMULATE) {
            continue;
        } else {
            fixed[visited[i]].operation = getOppositeOperation(fixed[visited[i]].operation);
            while (true) {
                let instruction = fixed[index];
                if (instruction.executed) {
                    break;
                }
                instruction.executed = true;

                operate(instruction);
                if (index >= fixed.length) {
                    ended = true;
                    break;
                }
            }
        }
    }

    function operate(instruction) {
        switch (instruction.operation) {
            case ACCUMULATE:
                accumulator += instruction.argument;
                index++;
                break;
            case JUMP:
                index += instruction.argument;
                break;
            case NONE:
                index++;
                break;
        }
    }

    function getOppositeOperation(operation) {
        return operation === JUMP ? NONE : JUMP;
    }

    return { value: accumulator };
}
