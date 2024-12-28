import { IntCode } from '../common/IntCode.js';
const [NORTH, SOUTH, WEST, EAST] = [1, 2, 3, 4];

export default function solve({ lines, rawData }) {
    let ic = new IntCode(rawData, null, 0, [], []);
    let grid = new Map();
    grid.set(getKey(0, 0), {
        steps: 0,
        x: 0,
        y: 0,
        type: 0,
    });

    let queue = [
        { x: 0, y: 0, steps: 0, direction: NORTH, state: null },
        { x: 0, y: 0, steps: 0, direction: EAST, state: null },
        { x: 0, y: 0, steps: 0, direction: SOUTH, state: null },
        { x: 0, y: 0, steps: 0, direction: WEST, state: null },
    ];

    let answer;
    while (queue.length > 0) {
        let current = queue.shift();

        if (current.state !== null) {
            ic.setState(current.state);
            ic.input.push(current.direction);
        }

        const { output, pointer, memory, relative } = ic.run();

        const out = output.pop();
        grid.get(getKey(current.x, current.y)).type = out;

        if (out === 2) {
            answer = current.steps;
            break;
        }

        if (out === 0) {
            continue;
        }

        let neighbors = [
            { x: current.x, y: current.y - 1, direction: NORTH },
            { x: current.x, y: current.y + 1, direction: SOUTH },
            { x: current.x - 1, y: current.y, direction: WEST },
            { x: current.x + 1, y: current.y, direction: EAST },
        ];

        neighbors.forEach((neighbor) => {
            let key = getKey(neighbor.x, neighbor.y);
            let bestState = grid.get(key);
            if (bestState !== undefined) {
                if (bestState.type === 0 || bestState.steps <= current.steps + 1) {
                    return;
                }
            } else {
                grid.set(key, {
                    steps: current.steps + 1,
                    x: neighbor.x,
                    y: neighbor.y,
                });
                queue.push({
                    x: neighbor.x,
                    y: neighbor.y,
                    steps: current.steps + 1,
                    direction: neighbor.direction,
                    state: {
                        output: output,
                        pointer: pointer,
                        memory: memory.slice(),
                        relative: relative,
                    },
                });
            }
        });
    }

    return { value: answer };
}

function getKey(x, y) {
    return `${x},${y}`;
}
