import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    const [BOX, WALL, ROBOT, EMPTY] = ['O', '#', '@', '.'];
    const [UP, RIGHT, DOWN, LEFT] = ['^', '>', 'v', '<'];
    const DELTAS = new Map([
        [UP, { x: 0, y: -1 }],
        [RIGHT, { x: 1, y: 0 }],
        [DOWN, { x: 0, y: 1 }],
        [LEFT, { x: -1, y: 0 }],
    ]);

    rawData = rawData.split(EOL + EOL);
    let grid = rawData[0].split(EOL).map((line) => line.split(''));

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

    simulate();
    const answer = scoreGrid();
    return new Solution(answer);

    function scoreGrid() {
        let gpsSum = 0;

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === BOX) {
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
        const delta = DELTAS.get(dir);
        let next = { x: robot.x + delta.x, y: robot.y + delta.y, isBox: false };
        const instructionStack = [next];

        // Build list of potential moves
        while (grid[next.y][next.x] === BOX) {
            next = { x: next.x + delta.x, y: next.y + delta.y, isBox: true };
            instructionStack.push(next);
        }

        // Check to see if we stopped because of a wall
        if (grid[next.y][next.x] === WALL) {
            return;
        }

        // Move the robot and any boxes in the stack
        while (instructionStack.length) {
            const instruction = instructionStack.pop();
            grid[instruction.y][instruction.x] = instruction.isBox ? BOX : ROBOT;

            if (!instruction.isBox) {
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
