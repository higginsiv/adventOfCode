import * as MATH from '#tools/math.js';
import { IntCode } from '../common/IntCode.js';
export default function solve({ lines, rawData }) {
    const PHASES = [5, 6, 7, 8, 9];
    const [A, B, C, D, E] = [0, 1, 2, 3, 4];
    const AMP_KEYS = [A, B, C, D, E];

    class Amp {
        key;
        input;
        output;
        memory;
        constructor(key, input, output, memory) {
            this.key = key;
            this.input = input;
            this.output = output;
            this.memory = memory;
        }
    }
    let phasePerms = MATH.permute(PHASES);
    const answer = phasePerms.reduce((maxThruster, curr, index) => {
        let thruster = findThruster(curr, rawData);
        return thruster > maxThruster ? thruster : maxThruster;
    }, -Infinity);

    function findThruster(ampsOrder, rawData) {
        let amps = [];
        for (let i = 0; i < AMP_KEYS.length; i++) {
            if (i === 0) {
                amps.push(new Amp(AMP_KEYS[i], [ampsOrder[i], 0], [ampsOrder[i + 1]], rawData));
            } else if (i !== AMP_KEYS.length - 1) {
                amps.push(new Amp(AMP_KEYS[i], amps[i - 1].output, [ampsOrder[i + 1]], rawData));
            } else {
                amps.push(new Amp(AMP_KEYS[i], amps[i - 1].output, amps[0].input, rawData));
            }
        }

        let allCompleted = false;
        while (!allCompleted) {
            allCompleted = true;
            amps.forEach((amp, index) => {
                if (amp.ic !== undefined) {
                    amp.ic.setState({ memory: amp.memory, pointer: amp.pointer });
                } else {
                    amp.ic = new IntCode(amp.memory, new Map(), 0, amp.input, amp.output);
                }

                const { pointer, memory, complete } = amp.ic.run();
                amp.pointer = pointer ?? 0;
                amp.memory = memory;
                if (!complete) {
                    allCompleted = false;
                }
            });
        }

        return amps.pop().output.pop();
    }

    return { value: answer };
}
