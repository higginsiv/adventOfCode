import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const grid = lines.map((line) => {
        return line.split('').map((char) => {
            return {
                char: char,
                visited: false,
            };
        });
    });
    let answer = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = grid[i][j];
            if (cell.visited) {
                continue;
            }
            let perimeter = 0;
            let area = 0;
            let queue = [{ i, j }];
            while (queue.length > 0) {
                let current = queue.shift();
                if (grid[current.i][current.j].visited) {
                    continue;
                }
                area++;
                grid[current.i][current.j].visited = true;
                let neighbors = getNeighbors(current.i, current.j, grid);
                neighbors.forEach((neighbor) => {
                    if (
                        neighbor.i < 0 ||
                        neighbor.i >= grid.length ||
                        neighbor.j < 0 ||
                        neighbor.j >= grid[0].length
                    ) {
                        perimeter++;
                        return;
                    }
                    if (grid[neighbor.i][neighbor.j].char !== cell.char) {
                        perimeter++;
                        return;
                    }
                    if (grid[neighbor.i][neighbor.j].visited) {
                        return;
                    }
                    queue.push(neighbor);
                });
            }

            answer += area * perimeter;
        }
    }
    return new Solution(answer);

    function getNeighbors(i, j, grid) {
        return [
            { i: i - 1, j: j },
            { i: i + 1, j: j },
            { i: i, j: j - 1 },
            { i: i, j: j + 1 },
        ];
    }
}
