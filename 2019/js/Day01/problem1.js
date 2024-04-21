module.exports = { solve: solve };
const { floor } = Math;
function solve({ lines, rawData }) {
    const answer = lines.map(Number).reduce((total, curr) => {
        return total + floor(curr / 3) - 2;
    }, 0);
    return { value: answer };
}
