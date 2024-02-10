module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { floor } = Math;

    // function kadane2D(matrix) {
    //     let maxSum = -Infinity;
    //     let left, right, top, bottom;

    //     for (let leftCol = 0; leftCol < matrix[0].length; leftCol++) {
    //         let temp = new Array(matrix.length).fill(0);

    //         for (let rightCol = leftCol; rightCol < matrix[0].length; rightCol++) {
    //             for (let i = 0; i < matrix.length; i++) {
    //                 temp[i] += matrix[i][rightCol];
    //             }

    //             let {
    //                 maxSum: currentMaxSum,
    //                 startIndex: currentStart,
    //                 endIndex: currentEnd,
    //             } = kadane(temp);

    //             // Check that the width and height are equal
    //             if (currentMaxSum > maxSum && currentEnd - currentStart == rightCol - leftCol) {
    //                 maxSum = currentMaxSum;
    //                 left = leftCol;
    //                 right = rightCol;
    //                 top = currentStart;
    //                 bottom = currentEnd;
    //             }
    //         }
    //     }

    //     return { maxSum, left, right, top, bottom };
    // }

    // function kadane(arr) {
    //     let localMax = arr[0];
    //     let globalMax = arr[0];
    //     let localStart = 0;
    //     let globalStart = 0;
    //     let globalEnd = 0;

    //     for (let i = 1; i < arr.length; i++) {
    //         if (arr[i] > localMax + arr[i]) {
    //             localMax = arr[i];
    //             localStart = i;
    //         } else {
    //             localMax = localMax + arr[i];
    //         }

    //         if (localMax > globalMax) {
    //             globalMax = localMax;
    //             globalStart = localStart;
    //             globalEnd = i;
    //         }
    //     }

    //     return { maxSum: globalMax, startIndex: globalStart, endIndex: globalEnd };
    // }

    function getPowerLevel(x, y, serialNumber) {
        const rackId = x + 10;
        let powerLevel = rackId * y;
        powerLevel += serialNumber;
        powerLevel *= rackId;
        powerLevel = floor(powerLevel / 100) % 10;
        powerLevel -= 5;
        return powerLevel;
    }

    const serialNumber = Number(rawData);
    let grid = new Array(300).fill(0).map(() => new Array(300).fill(0));

    let gridMax = new Array(300).fill(0).map(() => new Array(300).fill(0));

    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {
            grid[x - 1][y - 1] = getPowerLevel(x, y, serialNumber);
            gridMax[x - 1][y - 1] = grid[x - 1][y - 1];
        }
    }

    // let ans = kadane2D(grid);
    // console.log(ans);

    let maxx = { powerLevel: -Infinity, x: 0, y: 0, size: 0 };

    for (let i = 2; i <= 300; i++) {
        for (let x = 0; x < 300 - i; x++) {
            for (let y = 0; y < 300 - i; y++) {
                let gridPowerLevel = gridMax[x][y];
                for (let j = 0; j < i; j++) {
                    gridPowerLevel += grid[x + i - 1][y + j] + grid[x + j][y + i - 1];
                }
                gridMax[x][y] = gridPowerLevel;

                if (gridPowerLevel > maxx.powerLevel) {
                    maxx.powerLevel = gridPowerLevel;
                    maxx.x = x + 1;
                    maxx.y = y + 1;
                    maxx.size = i;
                }
            }
        }
    }

    return { value: `${maxx.x},${maxx.y},${maxx.size}` };
}
