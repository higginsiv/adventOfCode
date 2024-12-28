import { EOL } from 'os';
const POWERS = [1, 2, 4, 8, 16, 32, 64, 128, 256];
export default function solve({ lines, rawData }) {
    const ITERATIONS = 50;
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
        outsidePixels =
            outsidePixels === 0 ? algorithm[outsidePixels] : algorithm[algorithm.length - 1];
        grid = newGrid;
    }

    const answer = Array.from(grid.values()).reduce((acc, x) => acc + x, 0);
    return { value: answer };
}

function getKey(x, y) {
    return x * 1000 + y;
}

function getOutputValue(grid, algorithm, x, y, outsidePixels) {
    const algorithmPointer = getAlgorithmPointer(grid, x, y, outsidePixels);
    return algorithm[algorithmPointer];
}

function getAlgorithmPointer(grid, x, y, outsidePixels) {
    let algorithmPointer = 0;
    let power = 8;
    for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            const key = getKey(j, i);
            const cellValue = grid.get(key) === undefined ? outsidePixels : grid.get(key);
            algorithmPointer += cellValue * POWERS[power--];
        }
    }
    return algorithmPointer;
}
