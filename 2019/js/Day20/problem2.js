module.exports = { solve: solve };
const PriorityQueue = require('../../../tools/queue');

function solve({ lines, rawData }) {
    let grid = lines.map((line) => {
        return line.split('').map((char) => {
            return {
                char: char,
                best: new Map([[0, Infinity]]),
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
    grid[position[0]][position[1]].best.set(0, 0);
    // Start at -2 because of "steps" jumping off of portal AA and on portal ZZ
    let queue = new PriorityQueue({position, steps: -2, level: 0}, (a, b) => {
        let levelDiff = b.level - a.level;
        if (levelDiff !== 0) {
            return levelDiff;
        }
        return a.steps - b.steps;
    });

    let answer = null;
    while (queue.isNotEmpty()) {
        let current = queue.next();
        let [i, j] = current.position;
        let steps = current.steps;
        let level = current.level;
        // console.log(level)
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

            if (steps + 1 >= (neighbor.best.get(level) ?? Infinity)) {
                return;
            }

            let neighborChar = neighbor.char;
            if (neighborChar === '.') {
                if (steps + 1 < (neighbor.best.get(level) ?? Infinity)) {
                    neighbor.best.set(level, steps + 1);
                    queue.insert({ position: [ni, nj], steps: steps + 1, level: level });
                }
            } else if (neighborChar === '#' || neighborChar === ' ' || (neighborChar === 'ZZ' && level !== 0) || (neighborChar === 'AA' && level !== 0)) {
                return;
            } else {
                let portal = portals.get(neighborChar);
                if (portal) {
                    if (neighborChar === 'ZZ') {
                        queue.insert({ position: portal[0], steps: steps + 1, level: level });
                        return;
                    }
                    const increment = getIncrement(ni, nj, grid);
                    if (increment === 1 && neighborChar !== 'AA' && level === 0) {
                        return;
                    }

                    let [pi, pj] = portal[0];
                    if (pi === ni && pj === nj) {
                        [pi, pj] = portal[1];
                    }
                    grid[pi][pj].best.set(level, steps);
                    level += increment;
                    if (steps < (grid[pi][pj].best.get(level) ?? Infinity)){
                        grid[pi][pj].best.set(level, steps);
                        queue.insert({ position: [pi, pj], steps: steps, level: level});
                    }
                }
            }
        });
    }

    return { value: answer };
}

function getIncrement(row, col, grid) {
    if (row === 1 || row === grid.length - 2 || col === 1 || col === grid[0].length - 2) {
        console.log('outer')
        return 1;
    }
    return -1;
}
// 624 too low