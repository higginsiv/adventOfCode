export default function solve({ lines, rawData }) {
    const MAX_ROWS = 400000;
    const [SAFE, TRAP] = ['.', '^'];
    const TRAP_STRINGS = [
        `${TRAP}${TRAP}${SAFE}`,
        `${SAFE}${TRAP}${TRAP}`,
        `${TRAP}${SAFE}${SAFE}`,
        `${SAFE}${SAFE}${TRAP}`,
    ];

    function getSafeInRow(row) {
        return row.filter((x) => x === SAFE)?.length || 0;
    }

    function getThreeNeighbors(previousRow, index) {
        let left = index === 0 ? SAFE : previousRow[index - 1];
        let center = previousRow[index];
        let right = index === previousRow.length - 1 ? SAFE : previousRow[index + 1];
        return `${left}${center}${right}`;
    }

    let currentLine = rawData.split('');
    let numSafe = getSafeInRow(currentLine);

    for (let i = 1; i < MAX_ROWS; i++) {
        let newLine = [];

        for (let j = 0; j < currentLine.length; j++) {
            let neighbors = getThreeNeighbors(currentLine, j);
            newLine.push(TRAP_STRINGS.includes(neighbors) ? TRAP : SAFE);
        }

        numSafe += getSafeInRow(newLine);
        currentLine = newLine;
    }

    let answer = numSafe;
    return { value: answer };
}
