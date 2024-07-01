export default function solve({ lines, rawData }) {
    const [BUG, EMPTY] = [1, 0];
    let grid = lines.map((line) => line.split('').map((char) => (char === '#' ? 1 : 0)));

    let deltas = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ];
    let seen = new Set();
    let answer;

    while (true) {
        let newGrid = grid.map((row) => row.slice());
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let bugNeighbors = 0;
                for (let [dx, dy] of deltas) {
                    const newX = x + dx;
                    const newY = y + dy;
                    if (newX >= 0 && newX < grid[y].length && newY >= 0 && newY < grid.length) {
                        bugNeighbors += grid[newY][newX];
                    }
                }
                if (grid[y][x] === BUG && bugNeighbors !== 1) {
                    newGrid[y][x] = EMPTY;
                } else if (grid[y][x] === EMPTY && (bugNeighbors === 1 || bugNeighbors === 2)) {
                    newGrid[y][x] = BUG;
                }
            }
        }

        let key = newGrid.flat().reduce((acc, val, i) => acc + val * 2 ** i, 0);
        if (seen.has(key)) {
            answer = key;
            break;
        } else {
            seen.add(key);
        }

        grid = newGrid;
    }

    return { value: answer };
}
