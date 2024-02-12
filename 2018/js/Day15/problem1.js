module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function findClosestEnemy(x, y, adjacentToEnemies) {
        let queue = [{ x: x, y: y, distance: 0 }];
        let visited = new Map();
        let choices = [];
        let maxDistance = Infinity;
        while (queue.length > 0) {
            let current = queue.shift();
            if (current.distance > maxDistance) {
                continue;
            }
            if (adjacentToEnemies.has(current.x + ',' + current.y)) {
                choices.push(current);
                maxDistance = current.distance;
                continue;
            }

            if (current.distance === maxDistance) {
                continue;
            }

            let neighbors = [
                { x: current.x, y: current.y - 1 },
                { x: current.x - 1, y: current.y },
                { x: current.x + 1, y: current.y },
                { x: current.x, y: current.y + 1 },
            ];

            neighbors.forEach((neighbor) => {
                if (visited.has(neighbor.x + ',' + neighbor.y)) {
                    return;
                }
                if (grid[neighbor.x][neighbor.y] === '#') {
                    return;
                }
                if (grid[neighbor.x][neighbor.y] === '.') {
                    queue.push({ x: neighbor.x, y: neighbor.y, distance: current.distance + 1 });
                    visited.set(neighbor.x + ',' + neighbor.y, true);
                }
            });
        }

        // todo actually save the paths of the choices
        // todo return (of the closest) the one that fits the reading order
        // todo handle not being able to reach any enemies
    }
    let grid = lines.map((line) => line.split(''));
    let rounds = 0;
    while (true) {
        rounds++;
        break;
    }
    const answer = rounds - 1;
    return { value: answer };
}
