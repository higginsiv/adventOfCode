module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const answer = lines
        .map((lines) => lines.match(/\d+/g).map(Number))
        .reduce((acc, [depth, range]) => {
            const pos = depth % ((range - 1) * 2);
            return pos === 0 ? acc + depth * range : acc;
        }, 0);
    return { value: answer };
}
