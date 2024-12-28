import { IntCode } from '../common/IntCode.js';
const [SCAFFOLD, SPACE, ROBOT_UP, ROBOT_DOWN, ROBOT_LEFT, ROBOT_RIGHT] = [
    '#',
    '.',
    '^',
    'v',
    '<',
    '>',
];

export default function solve({ lines, rawData }) {
    let ic = new IntCode(rawData, null, 0, [], []);

    let { output } = ic.run();

    let grid = [];
    let row = [];
    while (output.length > 0) {
        const value = output.shift();
        if (value === 10) {
            grid.push(row);
            row = [];
        } else {
            row.push(String.fromCharCode(value));
        }
    }

    let alignmentSum = 0;
    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            let current = grid[i][j];
            let left = grid[i][j - 1];
            let right = grid[i][j + 1];
            let up = grid[i - 1][j];
            let down = grid[i + 1][j];

            if (
                isRobotOrScaffold(current) &&
                isRobotOrScaffold(left) &&
                isRobotOrScaffold(right) &&
                isRobotOrScaffold(up) &&
                isRobotOrScaffold(down)
            ) {
                alignmentSum += i * j;
            }
        }
    }
    const answer = alignmentSum;
    return { value: answer };
}

function isRobotOrScaffold(value) {
    return (
        value === SCAFFOLD ||
        value === ROBOT_UP ||
        value === ROBOT_DOWN ||
        value === ROBOT_LEFT ||
        value === ROBOT_RIGHT
    );
}
