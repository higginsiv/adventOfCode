module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const answer = lines.map(Number).reduce((a, b) => a + b, 0);
    return { value: answer };
}
