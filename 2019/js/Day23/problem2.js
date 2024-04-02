module.exports = { solve: solve };
const { IntCode } = require('../common/IntCode.js');

function solve({ lines, rawData }) {
    const NUM_COMPUTERS = 50;

    let inputs = Array.from({ length: NUM_COMPUTERS }, () => []);
    let idle = Array.from({ length: NUM_COMPUTERS }, () => false);

    let computers = [];
    for (let i = 0; i < NUM_COMPUTERS; i++) {
        inputs[i].push(i);
        computers.push(new IntCode(rawData, null, 0, inputs[i], [], true, false));
    }

    let lastNat = { x: null, y: null};
    let lastNatDelivered = { x: null, y: null};

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
                    lastNatY = y;
                } else {
                    inputs[address].push(x);
                    inputs[address].push(y);
                }
            } else {
                // TODO single tick mode means we can't just check the output. Every tick won't have output.
                idle[i] = output.length === 0 && computer.failedInput === true;
            }
        }

        if (idle.every((x) => x === true) && lastNat.x !== null && lastNat.y !== null) {
            if (lastNatDelivered.y === lastNat.y) {
                console.log('Delivered', lastNat)
                answer = lastNat.y;
                break outer;
            }
            inputs[0].push(lastNat.x);
            inputs[0].push(lastNat.y);
            lastNatDelivered = lastNat;
        }
    }

    return { value: answer };
}
