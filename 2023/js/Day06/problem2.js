module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [TIME, DISTANCE] = lines.map((x) => {
        x = x.replace(/\s+/g, '');
        return x.match(/\d+/g).map((x) => parseInt(x))[0];
    });

    const x1 = (TIME + Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
    const x2 = (TIME - Math.sqrt(TIME * TIME - 4 * DISTANCE)) / 2;
    const answer = Math.floor(x1) - Math.floor(x2);
    return { value: answer };
}
