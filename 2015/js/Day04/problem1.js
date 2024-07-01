import crypto from 'crypto';

export default function solve({ lines, rawData }) {
    const START_GOAL = '00000';
    const input = rawData;
    let num = 0;

    while (true) {
        let hashed = crypto
            .createHash('md5')
            .update(input + num)
            .digest('hex');

        if (hashed.startsWith(START_GOAL)) {
            break;
        }
        num++;
    }

    const answer = num;
    return { value: answer };
}
