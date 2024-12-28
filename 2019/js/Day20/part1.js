export default function solve({ lines, rawData }) {
    let grid = lines.map((line) => {
        return line.split('').map((char) => {
            return {
                char: char,
                best: Infinity,
            };
        });
    });

    let neighbors = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    let portals = new Map();

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const char = grid[i][j].char;
            if (char.match(/[A-Z]/)) {
                for (let n = 0; n < neighbors.length; n++) {
                    let [di, dj] = neighbors[n];
                    const ni = i + di;
                    const nj = j + dj;
                    if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[ni].length) {
                        const neighbor = grid[ni][nj].char;
                        if (neighbor === '.') {
                            let portal;
                            if (n === 0) {
                                // dot is to the right
                                portal = grid[i][j - 1].char + char;
                                grid[i][j].char = portal;
                                grid[i][j - 1].char = ' ';
                            } else if (n === 1) {
                                // dot is to the left
                                portal = char + grid[i][j + 1].char;
                                grid[i][j].char = portal;
                                grid[i][j + 1].char = ' ';
                            } else if (n === 2) {
                                // dot is below
                                portal = grid[i - 1][j].char + char;
                                grid[i][j].char = portal;
                                grid[i - 1][j].char = ' ';
                            } else if (n === 3) {
                                // dot is above
                                portal = char + grid[i + 1][j].char;
                                grid[i][j].char = portal;
                                grid[i + 1][j].char = ' ';
                            }

                            if (portals.has(portal)) {
                                portals.get(portal).push([i, j]);
                            } else {
                                portals.set(portal, [[i, j]]);
                            }
                        }
                    }
                }
            }
        }
    }

    let position = portals.get('AA')[0];
    let target = portals.get('ZZ')[0];
    grid[position[0]][position[1]].best = 0;
    // Start at -2 because of "steps" jumping off of portal AA and on portal ZZ
    let queue = [{ position, steps: -2 }];
    let answer = null;
    while (queue.length > 0) {
        let current = queue.shift();
        let [i, j] = current.position;
        let steps = current.steps;
        if (i === target[0] && j === target[1]) {
            answer = steps;
            break;
        }

        neighbors.forEach(([di, dj]) => {
            let [ni, nj] = [i + di, j + dj];
            if (ni < 0 || ni >= grid.length || nj < 0 || nj >= grid[ni].length) {
                return;
            }

            let neighbor = grid[ni][nj];

            if (steps + 1 >= neighbor.best) {
                return;
            }

            let neighborChar = neighbor.char;
            if (neighborChar === '.') {
                if (steps + 1 < neighbor.best) {
                    neighbor.best = steps + 1;
                    queue.push({ position: [ni, nj], steps: steps + 1 });
                }
            } else if (neighborChar === '#' || neighborChar === ' ') {
                return;
            } else {
                let portal = portals.get(neighborChar);
                if (portal) {
                    if (neighborChar === 'ZZ') {
                        queue.push({ position: portal[0], steps: steps + 1 });
                        return;
                    }
                    let [pi, pj] = portal[0];
                    if (pi === ni && pj === nj) {
                        [pi, pj] = portal[1];
                    }
                    if (steps < grid[pi][pj].best) {
                        grid[pi][pj].best = steps;
                        queue.push({ position: [pi, pj], steps: steps });
                    }
                }
            }
        });
    }

    return { value: answer };
}
