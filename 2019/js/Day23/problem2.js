import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    const NUM_COMPUTERS = 50;

    let inputs = Array.from({ length: NUM_COMPUTERS }, () => []);
    let idle = Array.from({ length: NUM_COMPUTERS }, () => false);

    let computers = [];
    for (let i = 0; i < NUM_COMPUTERS; i++) {
        inputs[i].push(i);
        // TODO instead of single tick can we go until an input/output is needed?
        computers.push(new IntCode(rawData, null, 0, inputs[i], [], true, false));
    }

    let lastNat = { x: null, y: null };
    let lastNatDelivered = { x: -1, y: null };

    let answer = null;
    outer: while (true) {
        for (let i = 0; i < NUM_COMPUTERS; i++) {
            const computer = computers[i];
            if (computer.isComplete()) {
                continue;
            }

            let { output } = computer.run();

            if (output.length === 3) {
                idle[i] = false;
                const address = output.shift();
                const x = output.shift();
                const y = output.shift();
                if (address === 255) {
                    lastNat = { x, y };
                } else {
                    inputs[address].push(x);
                    inputs[address].push(y);
                    idle[address] = false;
                }
            } else {
                idle[i] =
                    output.length === 0 &&
                    computer.input.length === 0 &&
                    computer.failedInput === true;
            }
        }

        if (idle.indexOf(false) == -1 && lastNat.x !== null && lastNat.y !== null) {
            if (lastNatDelivered.y === lastNat.y && lastNat.y != null) {
                answer = lastNat.y;
                break outer;
            }
            inputs[0].push(lastNat.x);
            inputs[0].push(lastNat.y);
            let setNull = lastNatDelivered.x === null;
            lastNatDelivered.x = lastNat.x;
            lastNatDelivered.y = lastNat.y;

            if (setNull) {
                lastNat = { x: null, y: null };
            }
        }
    }

    return { value: answer };
}
