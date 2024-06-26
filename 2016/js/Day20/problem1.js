export default function solve({ lines, rawData }) {
    const { max } = Math;
    lines = lines.map((line) => line.split('-').map(Number)).sort((a, b) => a[0] - b[0]);
    let min = 0;
    for (let line of lines) {
        if (line[0] > min) {
            break;
        }
        min = max(min, line[1] + 1);
    }

    let answer = min;
    return { value: answer };
}
