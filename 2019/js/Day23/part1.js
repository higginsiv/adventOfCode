import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    const NUM_COMPUTERS = 50;

    let inputs = Array.from({ length: NUM_COMPUTERS }, () => []);
    let computers = [];
    for (let i = 0; i < NUM_COMPUTERS; i++) {
        inputs[i].push(i);
        computers.push(new IntCode(rawData, null, 0, inputs[i], [], true, false));
    }

    let answer = null;
    outer: while (true) {
        for (let i = 0; i < NUM_COMPUTERS; i++) {
            const computer = computers[i];
            if (computer.isComplete()) {
                continue;
            }

            let { output } = computer.run();

            if (output.length === 3) {
                const address = output.shift();
                const x = output.shift();
                const y = output.shift();
                if (address === 255) {
                    answer = y;
                    break outer;
                }
                inputs[address].push(x);
                inputs[address].push(y);
            }
        }
    }

    return { value: answer };
}
