export default function solve({ lines, rawData }) {
    const data = lines.map((x) => parseInt(x)).sort((a, b) => a - b);

    let ones = 0;
    let threes = 0;

    for (let i = 0; i < data.length; i++) {
        let diff;
        if (i === 0) {
            diff = data[i] - 0;
        } else {
            diff = data[i] - data[i - 1];
        }

        if (diff === 1) {
            ones++;
        } else if (diff === 3) {
            threes++;
        }
    }

    threes++;

    const answer = ones * threes;
    return { value: answer };
}
