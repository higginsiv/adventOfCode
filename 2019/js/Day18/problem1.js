module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let grid = lines.map((line) => line.split(''));
    let position;
    let found = 0;
    let keys = new Map();
    let doors = new Map();
    const aCode = 'a'.charCodeAt(0);

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '@') {
                position = { x, y };
            } else if (grid[y][x].match(/[a-z]/)) {
                keys.set(grid[y][x], { x, y, mask: 1 << (grid[y][x].charCodeAt(0) - aCode) });
            } else if (grid[y][x].match(/[A-Z]/)) {
                doors.set(grid[y][x], { x, y });
            }
        }
    }
    console.log(keys);

    let queue = [{ position, keys: 0, steps: 0 }];

    while (queue.length > 0) {
        let current = queue.shift();

        let neighbors = [
            { x: current.position.x, y: current.position.y - 1 },
            { x: current.position.x, y: current.position.y + 1 },
            { x: current.position.x - 1, y: current.position.y },
            { x: current.position.x + 1, y: current.position.y },
        ];

        neighbors.forEach((neighbor) => {
            if (grid[neighbor.y][neighbor.x] === '#') {
                return;
            }

            let keys = current.keys;
            let steps = current.steps + 1;
            let key = grid[neighbor.y][neighbor.x];

            if (key.match(/[a-z]/)) {
                keys |= 1 << (key.charCodeAt(0) - aCode);
                // TODO replace capital in grid with '.'
            }

            // tODO delete after previous todo
            if (key.match(/[A-Z]/) && !(keys & (1 << (key.toLowerCase().charCodeAt(0) - aCode)))) {
                return;
            }

            if (
                key.match(/[a-z]/) &&
                !(current.keys & (1 << (key.charCodeAt(0) - aCode))) &&
                !(current.keys & (1 << (key.charCodeAt(0) - aCode)))
            ) {
                keys |= 1 << (key.charCodeAt(0) - aCode);
            }

            if (key === '@' || key.match(/[a-z]/)) {
                queue.push({ position: neighbor, keys, steps });
            }
        });
    }

    const answer = null;
    return { value: answer };
}
