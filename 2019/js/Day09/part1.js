import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    const answer = new IntCode(rawData, new Map(), 0, [1], []).run().output.pop();
    return { value: answer };
}
