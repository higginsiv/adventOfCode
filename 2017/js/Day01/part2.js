export default function solve({ lines, rawData }) {
    let answer = 0;
    let digits = rawData.split('').map((char) => parseInt(char));
    const half = digits.length / 2;

    for (let i = 0; i < half; i++) {
        if (digits[i] === digits[i + half]) {
            answer += digits[i] * 2;
        }
    }

    return { value: answer };
}
