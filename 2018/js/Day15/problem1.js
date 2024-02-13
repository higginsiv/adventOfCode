const { all } = require('async');

module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { manhattanDistance } = require('../../../tools/math');
    function getKey(x, y) {
        return x + ',' + y;
    }
    function getEnemiesInRange(entity) {
        const north = grid[entity.x - 1][entity.y];
        const west = grid[entity.x][entity.y - 1];
        const east = grid[entity.x][entity.y + 1];
        const south = grid[entity.x + 1][entity.y];
        const enemySymbol = entity.type === 'E' ? 'G' : 'E';

        let enemiesInRange = [];
        if (north === enemySymbol) {
            enemiesInRange.push({ x: entity.x - 1, y: entity.y });
        }

        if (west === enemySymbol) {
            enemiesInRange.push({ x: entity.x, y: entity.y - 1 });
        }

        if (east === enemySymbol) {
            enemiesInRange.push({ x: entity.x, y: entity.y + 1 });
        }

        if (south === enemySymbol) {
            enemiesInRange.push({ x: entity.x + 1, y: entity.y });
        }

        return enemiesInRange;
    }

    function sortByReadingOrder(a, b) {
        if (a.x === b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
    }

    function sortForAttack(a, b) {
        if (a.hp === b.hp) {
            return sortByReadingOrder(a, b);
        }
        return a.hp - b.hp;
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

    function prioritizeChoices(choices, startX, startY) {
        choices.sort(sortByReadingOrder);
        const destination = choices[0];
        const distance = destination.distance;
        const paths = findPathsOfDistance(
            [startX, startY],
            [destination.x, destination.y],
            distance,
        )
            .map((path) => {
                let firstStep = path[1];
                return { x: firstStep[0], y: firstStep[1] };
            })
            .sort(sortByReadingOrder);
        return paths[0];
    }

    function findPathsOfDistance(start, finish, distance) {
        let allPaths = [];
        let path = [start];
        let directions = [
            [0, -1],
            [-1, 0],
            [1, 0],
            [0, 1],
        ];
        let fastestToPoint = new Map();
        fastestToPoint.set(getKey(start[0], start[1]), distance);

        function dfs(position, remainingDistance) {
            if (remainingDistance < 0) {
                return;
            }
            if (remainingDistance === 0 && position[0] === finish[0] && position[1] === finish[1]) {
                allPaths.push(path.slice());
                return;
            }

            for (let direction of directions) {
                let newPosition = [position[0] + direction[0], position[1] + direction[1]];
                if (
                    newPosition[0] >= 0 &&
                    newPosition[0] < grid.length &&
                    newPosition[1] >= 0 &&
                    newPosition[1] < grid[0].length
                ) {
                    if (grid[newPosition[0]][newPosition[1]] !== '.') {
                        continue;
                    }

                    if (
                        manhattanDistance(
                            { x: newPosition[0], y: newPosition[1] },
                            { x: finish[0], y: finish[1] },
                        ) >
                        remainingDistance - 1
                    ) {
                        continue;
                    }

                    let newPositionKey = getKey(newPosition[0], newPosition[1]);
                    if (
                        fastestToPoint.has(newPositionKey) &&
                        fastestToPoint.get(newPositionKey) > remainingDistance - 1
                    ) {
                        continue;
                    }

                    if (
                        fastestToPoint.has(newPositionKey) &&
                        fastestToPoint.get(newPositionKey) === remainingDistance - 1 &&
                        allPaths.some(path => path.some(coord => coord[0] === newPosition[0] && coord[1] === newPosition[1]))
                    ) {
                        // TODO path push and pop here is a hail mary. Delete
                        // path.push(newPosition);
                        allPaths.push(path.slice());
                        // path.pop();
                        continue;
                    }
                    path.push(newPosition);
                    fastestToPoint.set(newPositionKey, remainingDistance - 1);
                    dfs(newPosition, remainingDistance - 1);
                    path.pop();
                }
            }
        }

        dfs(start, distance);
        return allPaths;
    }

    function findNextStep(x, y, adjacentToEnemies) {
        if (adjacentToEnemies.size === 0 || adjacentToEnemies.has(x + ',' + y)) {
            return null;
        }

        let queue = [{ x: x, y: y, distance: 0 }];
        let visited = new Set();
        visited.add(getKey(x, y));
        let choices = [];
        let maxDistance = Infinity;
        while (queue.length > 0) {
            // TODO possibly pop?
            let current = queue.shift();
            if (current.distance > maxDistance) {
                continue;
            }
            if (adjacentToEnemies.has(getKey(current.x, current.y))) {
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
                if (
                    neighbor.x < 0 ||
                    neighbor.y < 0 ||
                    neighbor.x >= grid.length ||
                    neighbor.y >= grid[0].length
                ) {
                    return;
                }
                const neighborKey = getKey(neighbor.x, neighbor.y);
                if (visited.has(neighborKey)) {
                    return;
                }
                let neighborSymbol = grid[neighbor.x][neighbor.y];
                if (neighborSymbol === '#' || neighborSymbol === 'G' || neighborSymbol === 'E') {
                    return;
                }
                if (grid[neighbor.x][neighbor.y] === '.') {
                    let firstStep = current.firstStep || neighbor;
                    queue.push({
                        x: neighbor.x,
                        y: neighbor.y,
                        distance: current.distance + 1,
                        firstStep: firstStep,
                    });
                    visited.add(neighborKey);
                }
            });
        }
        if (choices.length === 0) {
            return null;
        }

        return prioritizeChoices(choices, x, y);
    }

    function handleTurn(entity, enemies) {
        let enemiesInRange = getEnemiesInRange(entity);
        if (enemiesInRange.length === 0) {
            // Find Open Adjacent to Enemies
            let openAdjacentToEnemies = new Set();
            enemies.forEach((enemy) => {
                if (enemy.hp > 0) {
                    enemy.adjacent.forEach((space) => {
                        openAdjacentToEnemies.add(space);
                    });
                }
            });

            // Find first step towards closest enemy
            let nextStep = findNextStep(entity.x, entity.y, openAdjacentToEnemies);

            if (nextStep) {
                grid[entity.x][entity.y] = '.';
                entity.x = nextStep.x;
                entity.y = nextStep.y;
                grid[entity.x][entity.y] = entity.type;
                entity.adjacent = new Set();
                populateOpenAdjacent(entity);
                enemiesInRange = getEnemiesInRange(entity);
            }
        }

        // Attack
        let possibleCoordinates = enemiesInRange;
        let possibleTargets = enemies
            .filter((enemy) => {
                // TODO check on grid directly
                return possibleCoordinates.some(
                    (coord) => coord.x === enemy.x && coord.y === enemy.y && enemy.hp > 0,
                );
            })
            .sort(sortForAttack);

        if (possibleTargets.length > 0) {
            possibleTargets[0].hp -= 3;
            if (possibleTargets[0].hp <= 0) {
                grid[possibleTargets[0].x][possibleTargets[0].y] = '.';
                possibleTargets[0].x = -1;
                possibleTargets[0].y = -1;
                possibleTargets[0].adjacent = new Set();
                totalElves -= possibleTargets[0].type === 'E' ? 1 : 0;
                totalGoblins -= possibleTargets[0].type === 'G' ? 1 : 0;
            }
        }
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
                entities.push({ x: x, y: y, hp: 200, adjacent: null, type: 'G' });
                totalGoblins++;
            }
            if (grid[x][y] === 'E') {
                entities.push({ x: x, y: y, hp: 200, adjacent: null, type: 'E' });
                totalElves++;
            }
        }
    }
    console.log(totalElves);
    console.log(totalGoblins);
    // Populate adjacent spaces for each entity
    entities.forEach(populateOpenAdjacent);
    // console.log(entities)

    let rounds = 0;
    while (totalElves > 0 && totalGoblins > 0) {
        entities.sort(sortByReadingOrder);
        entities.forEach((entity, index) => {
            // console.log(rounds, index, entities.length, entity.x, entity.y)
            if (entity.hp <= 0) {
                return;
            }
            let enemies = entities.filter((other) => other.type !== entity.type);
            handleTurn(entity, enemies);
            entities.forEach((e) => {
                if (e.hp <= 0) {
                    return;
                }
                populateOpenAdjacent(e);
            });
        });

        entities = entities.filter((entity) => entity.hp > 0);
        // console.log(entities)
        rounds++;
        if (rounds % 10 === 0) {
            printGrid(grid, rounds);
        }

        if (rounds > 100) {
            break;
        }
    }
    console.log(entities);
    console.log(rounds);
    console.log(entities.reduce((acc, entity) => acc + entity.hp, 0));
    const answer = (rounds - 1) * entities.reduce((acc, entity) => acc + entity.hp, 0);
    return { value: answer };
}

function printGrid(grid, rounds) {
    console.log(rounds);
    grid.forEach((row) => {
        console.log(row.join(''));
    });
    console.log();
}
