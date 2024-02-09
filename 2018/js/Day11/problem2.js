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
    let grid = new Array(300).fill(0).map(() => new Array(300).fill(0));

    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {
            grid[x - 1][y - 1] = getPowerLevel(x, y, serialNumber);
        }
    }

    let maxPowerLevel = -Infinity;
    let maxPowerLevelCoords = '';
    for (let i = 1; i <= 300; i++) {
        for (let x = 0; x < 300 - i; x++) {
            for (let y = 0; y < 300 - i; y++) {
                let gridPowerLevel = 0;
                for (let j = 0; j < i; j++) {
                    if (x + j > 300) break;
                    for (let k = 0; k < i; k++) {
                        if (y + k > 300) break;
                        gridPowerLevel += grid[x + j][y + k];
                    }
                }
                if (gridPowerLevel > maxPowerLevel) {
                    maxPowerLevel = gridPowerLevel;
                    maxPowerLevelCoords = `${x + 1},${y + 1},${i}`;
                }
            }
        }
    }

    return { value: maxPowerLevelCoords };
}
