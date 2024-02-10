module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { floor } = Math;

    // function kadane(arr) {
    //     let localMax = 0;
    //     let globalMax = -Infinity;
    //     let localStart = 0;
    //     let globalStart = 0;

    //     for (let i = 0; i < arr.length; i++) {
    //         if (arr[i] > arr[i] + localMax) {
    //             localMax = arr[i];
    //             localStart = i;
    //         } else {
    //             localMax = arr[i] + localMax;
    //         }

    //         if (localMax > globalMax) {
    //             globalMax = localMax;
    //             globalStart = localStart;
    //         }
    //     }

    //     return { maxSum: globalMax, startIndex: globalStart };
    // }

    // console.log(kadane([1, 2, -3, -4, 1, 8, -30]));
    // process.exit(0);
    // function getHighestFactor(n) {
    //     for (let i = n - 1; i > 0; i--) {
    //         if (n % i === 0) {
    //             return i;
    //         }
    //     }
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

    // let highestFactors = new Map();
    // for (let i = 1; i <= 300; i++) {
    //     highestFactors.set(i, getHighestFactor(i));
    // }

    const serialNumber = Number(rawData);
    let grid = new Array(300).fill(0).map(() => new Array(300).fill(0));

    let gridMax = new Array(300).fill(0).map(() => new Array(300).fill(0));

    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {
            grid[x - 1][y - 1] = getPowerLevel(x, y, serialNumber);
            gridMax[x - 1][y - 1] = grid[x - 1][y - 1];
        }
    }

    let maxx = { powerLevel: -Infinity, x: 0, y: 0, size: 0 };

    // x
    // x + highestFactor
    // x + 2 * highestFactor
    for (let i = 2; i <= 300; i++) {
        // const highestFactor = highestFactors.get(i);
        // const multiple = i / highestFactor;
        for (let x = 0; x < 300 - i; x++) {
            for (let y = 0; y < 300 - i; y++) {
                // try 2
                // for (let j = 0; j < multiple; j++) {
                //     for (let k = 0; k < multiple; k++) {
                //         grid[x][y][i] += grid[x + j * highestFactor][y + k * highestFactor][highestFactor];
                //     }
                // }

                let gridPowerLevel = gridMax[x][y];
                for (let j = 0; j < i; j++) {
                    gridPowerLevel += grid[x + i - 1][y + j] + grid[x + j][y + i - 1];
                }
                gridMax[x][y] = gridPowerLevel;
                // const gridPowerLevel = grid[x][y][i];
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
