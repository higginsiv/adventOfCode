const fr = require('../../../tools/fileReader');
const [NORTH, EAST, SOUTH, WEST] = [1, 2, 3, 4];

const [YEAR, DAY, PART] = ['2023', '17', '1'];
const DATA = fr.getInput(YEAR, DAY).map((x) => {
    x = x.split('');
    return x.map((x) => parseInt(x));
});

class State {
    x;
    y;
    direction;
    steps;
    heatLoss;
    constructor(x, y, direction, steps, heatLoss) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.steps = steps;
        this.heatLoss = heatLoss;
    }
}

function getValidNeighbors(grid, point) {
    let [x, y] = point;
    let neighbors = [];

    // Define the possible moves to adjacent points
    let moves = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    moves.forEach(([dx, dy]) => {
        let newX = x + dx;
        let newY = y + dy;

        // Check if the new point is in bounds
        if (newX >= 0 && newY >= 0 && newX < grid.length && newY < grid[0].length) {
            neighbors.push([newX, newY]);
        }
    });

    return neighbors;
}

function getDirection(current, next) {
    if (current[0] === next[0]) {
        return current[1] > next[1] ? WEST : EAST;
    } else {
        return current[0] > next[0] ? NORTH : SOUTH;
    }
}

function generateKey(row, column, direction, count) {
    return `${row},${column},${direction},${count}`;
}

function getOppositeDirection(direction) {
    switch (direction) {
        case NORTH:
            return SOUTH;
        case SOUTH:
            return NORTH;
        case EAST:
            return WEST;
        case WEST:
            return EAST;
    }
}

function insertIntoSortedQueue(queue, state) {
    let low = 0;
    let high = queue.length;

    while (low < high) {
        let mid = (low + high) >>> 1;

        if (queue[mid].heatLoss < state.heatLoss) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    queue.splice(low, 0, state);
}

let visited = new Set();
let queue = [new State(0, 0, -1, 0, 0)];

let answer = Infinity;

while (queue.length > 0) {
    let current = queue.shift();

    if (current.x === DATA.length - 1 && current.y === DATA[0].length - 1) {
        answer = Math.min(answer, current.heatLoss);
        break;
    }

    let neighbors = getValidNeighbors(DATA, [current.x, current.y]);

    neighbors.forEach((neighbor) => {
        let [x, y] = neighbor;
        let heatLoss = current.heatLoss + DATA[x][y];
        let direction = getDirection([current.x, current.y], neighbor);
        let steps = current.direction === direction ? current.steps + 1 : 1;

        let key = generateKey(x, y, direction, steps);
        if (visited.has(key)) return;

        if (steps <= 3 && direction !== getOppositeDirection(current.direction)) {
            insertIntoSortedQueue(queue, new State(x, y, direction, steps, heatLoss));
            visited.add(key);
        }
    });
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
