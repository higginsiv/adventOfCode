import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    let input = [];

    let answer = 0;
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            input.push(i);
            input.push(j);
            let { output } = new IntCode(rawData, null, 0, input, []).run();
            answer += output[0];
        }
    }

    return { value: answer };
}
