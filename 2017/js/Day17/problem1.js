export default function solve({ lines, rawData }) {
    const steps = parseInt(rawData);

    let buffer = [0];

    for (let i = 1; i <= 2017; i++) {
        const index = ((steps + buffer.indexOf(i - 1)) % buffer.length) + 1;
        buffer.splice(index, 0, i);
    }

    const answer = buffer[buffer.indexOf(2017) + 1];
    return { value: answer };
}
