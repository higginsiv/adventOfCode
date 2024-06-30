export default function solve({ lines, rawData }) {
    const [DOOR, CARD] = lines.map((x) => parseInt(x));
    const DIVIDEND = 20201227;
    const INITIAL_SUBJECT = 7;

    let loop = 0;
    let value = 1;
    while (value !== DOOR) {
        loop++;
        value *= INITIAL_SUBJECT;
        value = value % DIVIDEND;
    }

    let answer = 1;
    while (loop > 0) {
        loop--;
        answer *= CARD;
        answer = answer % DIVIDEND;
    }
    return { value: answer };
}
