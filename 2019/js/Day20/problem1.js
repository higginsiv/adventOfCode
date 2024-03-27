module.exports = { solve: solve };

function solve({ lines, rawData }) {
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
                        if (neighbor.match(/[A-Z]/)) {
                            let portal;
                            if (n === 0) {
                                portal = char + neighbor;
                                grid[i][j].char = portal;
                                grid[ni][nj].char = ' ';
                            } else if (n === 1) {
                                portal = neighbor + char;
                                grid[i][j].char = portal;
                                grid[ni][nj].char = ' ';
                            } else if (n === 2) {
                                portal = char + neighbor;
                                grid[i][j].char = portal;
                                grid[ni][nj].char = ' ';
                            } else if (n === 3) {
                                portal = neighbor + char;
                                grid[i][j].char = portal;
                                grid[ni][nj].char = ' ';
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

    console.log(portals);
    let position = portals.get('AA')[0];
    let target = portals.get('ZZ')[0];
    grid[position[0]][position[1]].best = 0;
    let queue = [{ position, steps: -2 }];
    let answer = null;
    while (queue.length > 0) {
        // console.log(queue.length)
        let current = queue.shift();
        let [i, j] = current.position;
        let steps = current.steps;
        let best = grid[i][j].best;
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
            if (neighbor.char !== '#' && neighbor.char !== '.' ) console.log(neighbor.char)
            if (i === 128 && j === 51) {
                console.log(ni, nj, neighbor.char);
            }
            let neighborChar = neighbor.char;
            if (neighborChar === '.') {
                if (steps + 1 < neighbor.best) {
                    neighbor.best = steps + 1;
                    queue.push({ position: [ni, nj], steps: steps + 1 });
                }
            } else if (neighborChar === '#') {
                return;
            } else {
                // console.log(neighborChar);
                let portal = portals.get(neighborChar);
                // console.log(portal)
                if (portal) {
                    if (portal.length !== 2) {
                        queue.push({ position: portal[0], steps: steps });
                        return;
                    }
                    let [pi, pj] = portal[0];
                    if (pi === ni && pj === nj) {
                        [pi, pj] = portal[1];
                    }
                    if (steps + 1 < best) {
                        grid[pi][pj].best = steps;
                        queue.push({ position: [pi, pj], steps: steps });
                    }
                }
            }
        });
    }

    return { value: answer };
}
