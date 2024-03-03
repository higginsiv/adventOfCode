module.exports = { solve: solve };
const EOL = require('os').EOL;

function solve({ lines, rawData }) {
    const ITERATIONS = 2;
    let symbols = new Map([
        ['#', 1],
        ['.', 0],
    ]);
    rawData = rawData.split(EOL + EOL);
    const algorithm = rawData[0].split('').map((x) => symbols.get(x));

    let initialImage = rawData[1].split(EOL).map((row) => row.split(''));
    let grid = new Map();
    initialImage.forEach((row, y) => {
        row.forEach((cell, x) => {
            grid.set(getKey(x, y), symbols.get(cell));
        });
    });

    let minY = 0;
    let maxY = initialImage.length - 1;
    let minX = 0;
    let maxX = initialImage[0].length - 1;

    let outsidePixels = 0;
    for (let i = 0; i < ITERATIONS; i++) {
        let newGrid = new Map();
        for (let y = minY - 2; y < maxY + 2; y++) {
            for (let x = minX - 2; x < maxX + 2; x++) {
                newGrid.set(getKey(x, y), getOutputValue(grid, algorithm, x, y, outsidePixels));
            }
        }
        minY -= 2;
        maxY += 2;
        minX -= 2;
        maxX += 2;
        outsidePixels = algorithm[outsidePixels];
        grid = newGrid;
    }

    const answer = Array.from(grid.values()).reduce((acc, x) => acc + x, 0);
    return { value: answer };
}

function getKey(x, y) {
    return `${x},${y}`;
}

function getOutputValue(grid, algorithm, x, y, outsidePixels) {
    const binaryValue = getBinaryInputValue(grid, x, y, outsidePixels);
    return algorithm[binaryValue];
}

function getBinaryInputValue(grid, x, y, outsidePixels) {
    let binaryArray = [];
    for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            const value = grid.get(getKey(j, i));
            binaryArray.push(value === undefined ? outsidePixels : value);
        }
    }
    return parseInt(binaryArray.join(''), 2);
}
