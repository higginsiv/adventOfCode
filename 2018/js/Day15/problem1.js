module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function sortByReadingOrder(a, b) {
        if (a.x === b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
    }

    function populateOpenAdjacent(entity) {
        entity.adjacent = new Set();
        let neighbors = [
            { x: entity.x, y: entity.y - 1 },
            { x: entity.x - 1, y: entity.y },
            { x: entity.x + 1, y: entity.y },
            { x: entity.x, y: entity.y + 1 },
        ];
        neighbors.forEach((neighbor) => {
            if (grid[neighbor.x][neighbor.y] === '.') {
                entity.adjacent.add(neighbor.x + ',' + neighbor.y);
            }
        });
    }

    function findSpacesAdjacentToEnemies() {
        // let adjacentToGoblins = new Set();
        // let adjacentToElves = new Set();
        // for (let x = 0; x < grid.length; x++) {
        //     for (let y = 0; y < grid[x].length; y++) {
        //         if (grid[x][y] === 'G' || grid[x][y] === 'E') {
        //             let neighbors = [
        //                 { x: x, y: y - 1 },
        //                 { x: x - 1, y: y },
        //                 { x: x + 1, y: y },
        //                 { x: x, y: y + 1 },
        //             ];
        //             neighbors.forEach((neighbor) => {
        //                 if (grid[neighbor.x][neighbor.y] === '.') {
        //                     spaces.add(neighbor.x + ',' + neighbor.y);
        //                 }
        //             });
        //         }
        //     }
        // }
        // return spaces;
    }
    function findNextStep(x, y, adjacentToEnemies) {
        let queue = [{ x: x, y: y, distance: 0 }];
        let visited = new Set();
        visited.add(x + ',' + y);
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
                const neighborKey = neighbor.x + ',' + neighbor.y;
                if (visited.has(neighborKey)) {
                    return;
                }
                if (grid[neighbor.x][neighbor.y] === '#') {
                    return;
                }
                if (grid[neighbor.x][neighbor.y] === '.') {
                    let firstStep = current.firstStep || neighbor;
                    queue.push({ x: neighbor.x, y: neighbor.y, distance: current.distance + 1, firstStep: firstStep});
                    visited.add(neighborKey);
                }
            });
        }
        if (choices.length === 0) {
            return null;
        }

        choices.sort(sortByReadingOrder);
        return choices[0].firstStep;
        // todo make pathfinding avoid Gs and Es
    }

    function handleTurn(entity, enemies) {
        // Find Adjacent to Enemies
        let adjacentToEnemies = new Set();
        enemies.forEach((enemy) => {
            enemy.adjacent.forEach((space) => {
                adjacentToEnemies.add(space);
            });
        });

        // Find first step towards closest enemy
        let nextStep = findNextStep(entity.x, entity.y, adjacentToEnemies);
        if (nextStep) {
            grid[entity.x][entity.y] = '.';
            entity.x = nextStep.x;
            entity.y = nextStep.y;
            grid[entity.x][entity.y] = entity.type;
            entity.adjacent = new Set();
            populateOpenAdjacent(entity);
        }

        // Attack
        // TODO Attack logic
    }

    // Start logic
    let grid = lines.map((line) => line.split(''));
    let entities = [];
    let totalElves = 0;
    let totalGoblins = 0;
    // Find locations of elves and goblins
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] === 'G') {
                entities.push({ x: x, y: y, hp: 200, adjacent: null, type: 'G'});
                totalGoblins++;
            }
            if (grid[x][y] === 'E') {
                entities.push({ x: x, y: y, hp: 200, adjacent: null, type: 'E'});
                totalElves++;
            }
        }
    }
    // Populate adjacent spaces for each entity
    entities.forEach(populateOpenAdjacent);

    let rounds = 0;
    while (totalElves > 0 || totalGoblins > 0) {
        entities.sort(sortByReadingOrder);
        entities.forEach((entity) => {
            if (entity.hp <= 0) {
                return;
            }
            let enemies = entities.filter((other) => other.type !== entity.type);
            handleTurn(entity, enemies);
        });

        // TODO remove dead entities
        // TODO change for forEach OR update grid when enemies die
        rounds++;
        break;
    }
    const answer = rounds - 1 * entities.reduce((acc, entity) => acc + entity.hp, 0);
    return { value: answer };
}
