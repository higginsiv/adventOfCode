import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    let ic = new IntCode(rawData, null, 0, [], []);
    ic.addAsciiInput(['NOT A J', 'NOT B T', 'OR T J', 'NOT C T', 'OR T J', 'AND D J', 'WALK']);
    const { output } = ic.run();
    const answer = output.pop();
    return { value: answer };
}
