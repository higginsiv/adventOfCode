module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { manhattanDistance } = require('../../../tools/math');

    let lowX = Infinity;
    let highX = -Infinity;
    let lowY = Infinity;
    let highY = -Infinity;

    lines = lines.map((line) => {
        line = line.split(', ').map(Number);
        const x = line[0];
        const y = line[1];
        if (x < lowX) {
            lowX = x;
        }
        if (x > highX) {
            highX = x;
        }
        if (y < lowY) {
            lowY = y;
        }
        if (y > highY) {
            highY = y;
        }

        return { x, y};
    });

    const answer = lines.reduce((max, line) => {
        if (line.uniquePointsCount === -Infinity) {
            return max;
        }
        return max > line.uniquePointsCount ? max : line.uniquePointsCount;
    });
    return { value: answer };
}
