module.exports = { solve: solve };
const { IntCode } = require('../common/IntCode.js');
const [BLACK, WHITE] = [0, 1];
const [LEFT, RIGHT] = [0, 1];
const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3];

function solve({ lines, rawData }) {
    let input = [0];
    let output = [];
    let robot = new IntCode(rawData, new Map(), 0, input, output);

    let grid = new Map();
    let location = { x: 0, y: 0 };
    let direction = NORTH;

    while (true) {
        const { pointer, memory, complete, relative } = robot.run();
        if (complete) {
            break;
        }
        const turn = output.pop();
        const color = output.pop();

        grid.set(createKey(location.x, location.y), color);

        direction = turnRobot(direction, turn);

        if (direction === NORTH) {
            location.y--;
        } else if (direction === SOUTH) {
            location.y++;
        } else if (direction === WEST) {
            location.x--;
        } else {
            location.x++;
        }

        let nextInput = grid.get(createKey(location.x, location.y));
        if (nextInput === undefined) {
            nextInput = BLACK;
        }
        input.push(nextInput);
        robot.setState({ pointer, memory, relative });
    }

    const answer = grid.size;
    return { value: answer };
}

function turnRobot(direction, turn) {
    if (turn === LEFT) {
        return (direction + 3) % 4;
    } else {
        return (direction + 1) % 4;
    }
}

function createKey(x, y) {
    return x + ',' + y;
}
