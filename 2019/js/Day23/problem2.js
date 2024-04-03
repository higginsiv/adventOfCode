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
    let lastNatDelivered = { x: -1, y: null};
    let count = 0;

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
                    lastNat = {x, y};
                } else {
                    inputs[address].push(x);
                    inputs[address].push(y);
                    idle[address] = false;
                }
            } else {
                // TODO single tick mode means we can't just check the output. Every tick won't have output.
                idle[i] = output.length === 0 && computer.input.length === 0;
            }
        }
        if (lastNat.y == 13758) {
            let index = idle.indexOf(false);
            if (index === -1) {
                console.log('All idle', count, lastNat, lastNatDelivered)
            } else {
                console.log('Last NAT:', lastNat, lastNatDelivered, count, inputs[index], computers[index].failedInput, computers[index].output);

            }
        }

        if (idle.indexOf(false) == -1 && lastNat.x !== null && lastNat.y !== null) {
            count++;
            if (lastNatDelivered.y === lastNat.y && lastNat.y != null) {
                console.log('Delivered', lastNat, lastNatDelivered, count, inputs[0])
                answer = lastNat.y;
                break outer;
            }
            inputs[0].push(lastNat.x);
            inputs[0].push(lastNat.y);
            let setNull = lastNatDelivered.x === null;
            lastNatDelivered.x = lastNat.x;
            lastNatDelivered.y = lastNat.y;
            if (lastNatDelivered.y == null) {
                console.log('setting to null')
            }
            // console.log('SET', lastNatDelivered)

            if (setNull) {
                lastNat = { x: null, y: null};
            }
        } else {
            count = 0;
        }
    }

    return { value: answer };
}
