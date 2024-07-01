import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    let output = new IntCode(rawData, new Map(), 0, [1], []).run().output;
    return { value: output[output.length - 1] };
}
