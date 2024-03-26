module.exports = { solve: solve };

function solve({ lines, rawData }) {
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

    // Update grid to create four vaults
    grid[position.y][position.x].char = '#';
    grid[position.y - 1][position.x].char = '#';
    grid[position.y + 1][position.x].char = '#';
    grid[position.y][position.x - 1].char = '#';
    grid[position.y][position.x + 1].char = '#';
    grid[position.y - 1][position.x - 1].char = '@';
    grid[position.y - 1][position.x + 1].char = '@';
    grid[position.y + 1][position.x - 1].char = '@';
    grid[position.y + 1][position.x + 1].char = '@';

    let position1 = { x: position.x - 1, y: position.y - 1 };
    let position2 = { x: position.x + 1, y: position.y - 1 };
    let position3 = { x: position.x - 1, y: position.y + 1 };
    let position4 = { x: position.x + 1, y: position.y + 1 };

    let queue = [{ position1, position2, position3, position4, keys: 0, steps: 0 }];

    while (queue.length > 0) {
        let current = queue.shift();

        if (current.keys === (1 << keys.size) - 1) {
            fewestSteps = current.steps;
            break;
        }

        let neighbors = [
            ...getNeighbors(current.position1),
            ...getNeighbors(current.position2),
            ...getNeighbors(current.position3),
            ...getNeighbors(current.position4),
        ];

        let newSteps = current.steps + 1;
        neighbors.forEach((neighbor, index) => {
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

            let newPosition1 = index < 4 ? neighbor : current.position1;
            let newPosition2 = index >= 4 && index < 8 ? neighbor : current.position2;
            let newPosition3 = index >= 8 && index < 12 ? neighbor : current.position3;
            let newPosition4 = index >= 12 ? neighbor : current.position4;
            queue.push({
                position1: newPosition1,
                position2: newPosition2,
                position3: newPosition3,
                position4: newPosition4,
                keys,
                steps: newSteps,
            });
        });
    }

    function getNeighbors(position) {
        return [
            { x: position.x, y: position.y - 1 },
            { x: position.x, y: position.y + 1 },
            { x: position.x - 1, y: position.y },
            { x: position.x + 1, y: position.y },
        ];
    }

    const answer = fewestSteps;
    return { value: answer };
}
