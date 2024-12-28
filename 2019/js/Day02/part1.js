import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    let replacements = new Map([
        [1, 12],
        [2, 2],
    ]);
    const answer = new IntCode(rawData, replacements, 0).run().memory[0];
    return { value: answer };
}
