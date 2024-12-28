export default function solve({ lines, rawData }) {
    let grid = lines.map((line) => {
        return line.split('').map((char) => {
            return { char, visited: new Map() };
        });
    });

    let position;
    let fewestSteps = 0;
    let keys = new Map();
    let doors = new Map();
    const aCode = 'a'.charCodeAt(0);

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x].char === '@') {
                position = { x, y };
            } else if (grid[y][x].char.match(/[a-z]/)) {
                keys.set(grid[y][x].char, {
                    x,
                    y,
                    mask: 1 << (grid[y][x].char.charCodeAt(0) - aCode),
                });
            } else if (grid[y][x].char.match(/[A-Z]/)) {
                doors.set(grid[y][x].char, { x, y });
            }
        }
    }

    let queue = [{ position, keys: 0, steps: 0 }];

    while (queue.length > 0) {
        let current = queue.shift();

        if (current.keys === (1 << keys.size) - 1) {
            fewestSteps = current.steps;
            break;
        }

        let neighbors = [
            { x: current.position.x, y: current.position.y - 1 },
            { x: current.position.x, y: current.position.y + 1 },
            { x: current.position.x - 1, y: current.position.y },
            { x: current.position.x + 1, y: current.position.y },
        ];

        let newSteps = current.steps + 1;
        neighbors.forEach((neighbor) => {
            let keys = current.keys;
            let char = grid[neighbor.y][neighbor.x].char;

            if (
                grid[neighbor.y][neighbor.x].visited.has(keys) &&
                grid[neighbor.y][neighbor.x].visited.get(keys) <= newSteps
            ) {
                return;
            }

            if (char === '#') {
                return;
            }

            if (char.match(/[a-z]/)) {
                keys |= 1 << (char.charCodeAt(0) - aCode);
            } else if (
                char.match(/[A-Z]/) &&
                !(keys & (1 << (char.toLowerCase().charCodeAt(0) - aCode)))
            ) {
                return;
            }

            grid[neighbor.y][neighbor.x].visited.set(keys, newSteps);
            queue.push({ position: neighbor, keys, steps: newSteps });
        });
    }

    const answer = fewestSteps;
    return { value: answer };
}
