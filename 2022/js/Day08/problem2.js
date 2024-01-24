const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '08', '2'];
const data = fr.getInput(year, day).map((x) => x.split('').map((y) => parseInt(y)));

let maxScenicScore = -Infinity;

for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
        let scenicScore =
            check(x, y, 1, 0, data[x][y], -Infinity) *
            check(x, y, -1, 0, data[x][y], -Infinity) *
            check(x, y, 0, 1, data[x][y], -Infinity) *
            check(x, y, 0, -1, data[x][y], -Infinity);

        if (scenicScore > maxScenicScore) {
            maxScenicScore = scenicScore;
        }
    }
}

function check(x, y, xDelta, yDelta, originalHeight, newHeight, numTrees = 0) {
    if (newHeight >= originalHeight) {
        return numTrees;
    }

    if (x === 0 || x === data.length - 1 || y === 0 || y === data[x].length - 1) {
        return numTrees;
    }

    numTrees++;
    return check(
        x + xDelta,
        y + yDelta,
        xDelta,
        yDelta,
        originalHeight,
        data[x + xDelta][y + yDelta],
        numTrees,
    );
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + maxScenicScore);
