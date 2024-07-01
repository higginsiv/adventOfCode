export default function solve({ lines, rawData }) {
    const data = rawData
        .split(',')
        .map((x) => parseInt(x))
        .sort((x, y) => x - y);

    let bestDelta = null;
    for (let i = data[0]; i < data[data.length - 1]; i++) {
        const delta = data.reduce((previous, current) => (previous += Math.abs(current - i)), 0);
        if (bestDelta === null || delta < bestDelta) {
            bestDelta = delta;
        }
    }

    const answer = bestDelta;
    return { value: answer };
}
