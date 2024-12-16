import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    const [BOX, WALL, ROBOT, EMPTY, BOX_LEFT, BOX_RIGHT] = ['O', '#', '@', '.', '[', ']'];
    const [UP, RIGHT, DOWN, LEFT] = ['^', '>', 'v', '<'];
    const DELTAS = new Map([
        [UP, { x: 0, y: -1 }],
        [RIGHT, { x: 1, y: 0 }],
        [DOWN, { x: 0, y: 1 }],
        [LEFT, { x: -1, y: 0 }],
    ]);

    rawData = rawData.split(EOL + EOL);
    let grid = rawData[0].split(EOL).map((line) => {
        line = line.replaceAll(BOX, `${BOX_LEFT}${BOX_RIGHT}`);
        line = line.replaceAll(EMPTY, `${EMPTY}${EMPTY}`);
        line = line.replaceAll(WALL, `${WALL}${WALL}`);
        line = line.replaceAll(ROBOT, `${ROBOT}${EMPTY}`);
        return line.split('');
    });

    let commands = rawData[1].replaceAll(EOL, '').split('');

    let robot;

    outer: for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === ROBOT) {
                robot = { x: j, y: i };
                break outer;
            }
        }
    }

    // printGrid(0, 'Initial');
    simulate();
    // printGrid(9999, 'Final');
    const answer = scoreGrid();
    return new Solution(answer);

    function scoreGrid() {
        let gpsSum = 0;

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === BOX_LEFT) {
                    gpsSum += 100 * i + j;
                }
            }
        }
        return gpsSum;
    }

    function simulate() {
        // let index = 1;
        while (commands.length) {
            const command = commands.shift();
            moveRobot(command);
            // printGrid(index++, command);
        }
    }

    function moveRobot(dir) {
        if (dir === LEFT || dir === RIGHT) {
            moveHorizontal(dir);
        } else {
            let valid = moveVertical(dir, robot.x, robot.y);
            if (valid) {
                moveVertical(dir, robot.x, robot.y, true);
            }
        }
    }

    // TODO I'm going through the recursion twice because I'm rushing to get this done. Find better
    function moveVertical(dir, x, y, executeMoves = false) {
        if (grid[y][x] === WALL) {
            return false;
        }

        if (grid[y][x] === EMPTY) {
            return true;
        }

        const delta = DELTAS.get(dir);
        let moves = [];
        let next = { x: x + delta.x, y: y + delta.y, symbol: grid[y][x], startX: x, startY: y };
        moves.push(next);

        if (next.symbol === BOX_LEFT) {
            moves.push({ x: next.x + 1, y: next.y, symbol: BOX_RIGHT, startX: x + 1, startY: y });
        } else if (next.symbol === BOX_RIGHT) {
            moves.push({ x: next.x - 1, y: next.y, symbol: BOX_LEFT, startX: x - 1, startY: y });
        }

        let valid = moves.every((move) => moveVertical(dir, move.x, move.y, executeMoves));

        if (!valid) {
            return false;
        }

        if (executeMoves) {
            moves.forEach((move) => {
                grid[move.y][move.x] = move.symbol;
                grid[move.startY][move.startX] = EMPTY;
                if (move.symbol === ROBOT) {
                    robot = move;
                }
            });
        }
        return true;
    }

    function moveHorizontal(dir) {
        const delta = DELTAS.get(dir);
        let next = { x: robot.x + delta.x, y: robot.y + delta.y, symbol: ROBOT };
        const instructionStack = [next];

        // Build list of potential moves
        while (grid[next.y][next.x] === BOX_LEFT || grid[next.y][next.x] === BOX_RIGHT) {
            next = { x: next.x + delta.x, y: next.y + delta.y, symbol: grid[next.y][next.x] };
            instructionStack.push(next);
        }

        // Check to see if we stopped because of a wall
        if (grid[next.y][next.x] === WALL) {
            return;
        }

        // Move the robot and any boxes in the stack
        while (instructionStack.length) {
            const instruction = instructionStack.pop();
            grid[instruction.y][instruction.x] = instruction.symbol;

            if (instruction.symbol === ROBOT) {
                grid[robot.y][robot.x] = EMPTY;
                robot = instruction;
            }
        }
    }

    function printGrid(index, command) {
        console.log(index, command);
        for (let i = 0; i < grid.length; i++) {
            console.log(grid[i].join(''));
        }
        console.log(EOL);
    }
}
