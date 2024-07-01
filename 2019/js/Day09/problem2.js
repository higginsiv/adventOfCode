import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    const answer = new IntCode(rawData, new Map(), 0, [2], []).run().output.pop();
    return { value: answer };
}
