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
                        // TODO double check these are right. weird that only 1 is setting the primary indices to portal 
                        if (neighbor.match(/[A-Z]/)) {
                            let portal;
                            if (n === 0) {
                                portal = char + neighbor;
                                grid[i][j].char = ' ';
                                grid[ni][nj].char = portal;
                            } else if (n === 1) {
                                portal = neighbor + char;
                                grid[i][j].char = ' ';
                                grid[ni][nj].char = portal;
                            } else if (n === 2) {
                                portal = char + neighbor;
                                grid[i][j].char = ' ';
                                grid[ni][nj].char = portal;
                            } else if (n === 3) {
                                portal = neighbor + char;
                                grid[i][j].char = portal;
                                grid[ni][nj].char = ' ';
                            }

                            // TODO finalize this logic to correctly set the portal values
                            for (let ne = 0; ne < neighbors.length; ne++) {
                                let [dne, dnj] = neighbors[ne];
                                const nni = ni + dne;
                                const nnj = nj + dnj;
                                if (nni >= 0 && nni < grid.length && nnj >= 0 && nnj < grid[nni].length) {
                                    const nneighbor = grid[nni][nnj].char;
                                    if (nneighbor === '.') {
                                        grid[nni][nnj].char = portal;
                                    }
                                }
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
    console.log(grid[129][45]);
    console.log(grid[130][45]);
    let position = portals.get('AA')[0];
    let target = portals.get('ZZ')[0];
    grid[position[0]][position[1]].best = 0;
    let queue = [{ position, steps: 0 }];
    let answer = null;
    while (queue.length > 0) {
        // console.log(queue.length)
        let current = queue.shift();
        let [i, j] = current.position;
        let steps = current.steps;
        // console.log(steps)
        if (i === target[0] && j === target[1]) {
            console.log('reached')
            answer = steps;
            break;
        }

        neighbors.forEach(([di, dj]) => {
            let [ni, nj] = [i + di, j + dj];
            if (ni < 0 || ni >= grid.length || nj < 0 || nj >= grid[ni].length) {
                return;
            }

            let neighbor = grid[ni][nj];
            if (neighbor.best == null) {
                console.log('error')
            }
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
                // console.log(neighborChar);
                let portal = portals.get(neighborChar);
                // console.log(portal)
                if (portal) {
                    console.log('portal' + neighborChar, ni, nj, steps + 1, grid[ni][nj].best)
                    if (neighborChar === 'ZZ') {
                        console.log('DONE',portal[0])
                        queue.push({ position: portal[0], steps: steps + 1 });
                        return;
                    }
                    let [pi, pj] = portal[0];
                    if (pi === ni && pj === nj) {
                        [pi, pj] = portal[1];
                    }
                    if (steps + 1 < grid[pi][pj].best) {
                        grid[pi][pj].best = steps + 1;
                        queue.push({ position: [pi, pj], steps: steps + 1 });
                    }
                }
            }
        });
    }

    return { value: answer };
}
