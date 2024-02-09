module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { floor } = Math;
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
    let grid = new Array(300)
        .fill(0)
        .map(() => new Array(300).fill(0).map(() => new Array(300).fill(0)));

    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {
            grid[x - 1][y - 1][0] = getPowerLevel(x, y, serialNumber);
            grid[x - 1][y - 1][1] = getPowerLevel(x, y, serialNumber);
        }
    }

    let maxPowerLevel = -Infinity;
    let maxPowerLevelX;
    let maxPowerLevelY;
    let maxPowerLevelSize;

    for (let i = 1; i <= 300; i++) {
        for (let x = 0; x < 300 - i; x++) {
            for (let y = 0; y < 300 - i; y++) {
                let previous = grid[x][y][i - 1];
                let gridPowerLevel = previous;
                for (let j = 0; j < i; j++) {
                    gridPowerLevel += grid[x + i - 1][y + j][1];
                    gridPowerLevel += grid[x + j][y + i - 1][1];
                }
                grid[x][y][i] = gridPowerLevel;

                if (gridPowerLevel > maxPowerLevel) {
                    maxPowerLevel = gridPowerLevel;
                    maxPowerLevelX = x + 1;
                    maxPowerLevelY = y + 1;
                    maxPowerLevelSize = i;
                }
            }
        }
    }

    return { value: `${maxPowerLevelX},${maxPowerLevelY},${maxPowerLevelSize}` };
}
