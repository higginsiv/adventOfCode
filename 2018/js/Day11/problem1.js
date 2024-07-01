export default function solve({ lines, rawData }) {
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
    const gridSize = 3;
    let powerLevels = new Map();
    for (let x = 1; x <= 300; x++) {
        for (let y = 1; y <= 300; y++) {
            let gridPowerLevel = 0;
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (x + i > 300 || y + j > 300) break;
                    gridPowerLevel += getPowerLevel(x + i, y + j, serialNumber);
                }
            }
            powerLevels.set(`${x},${y}`, gridPowerLevel);
        }
    }
    const answer = [...powerLevels.entries()].reduce(
        (acc, [key, value]) => (value > acc.value ? { key, value } : acc),
        { key: '', value: -Infinity },
    );

    return { value: answer.key };
}
