module.exports = {solve: solve};
const { IntCode } = require('../common/IntCode2.js');
const [NORTH, SOUTH, WEST, EAST] = [1, 2, 3, 4];

function solve({lines, rawData}) {
    let ic = new IntCode(rawData, null, 0, [], []);
    let grid = new Map();
    grid.set(getKey(0, 0), {
        steps: 0,
        x: 0,
        y: 0,
        type: 0
    })

    let queue = [{x: 0, y: 0, steps: 0, direction: NORTH, state: null}];

    let answer;
    while (queue.length > 0) {
        let current = queue.shift();
        // todo check for win
        if (current.type === 2) {
            answer = current.steps;
            break;
        }

        if (current.state !== null) {
            ic.setState(current.state);
        }
        const {output, pointer, memory, relative } = ic.run();

        let neighbors = [
            {x: current.x, y: current.y - 1, direction: NORTH},
            {x: current.x, y: current.y + 1, direction: SOUTH},
            {x: current.x - 1, y: current.y, direction: WEST},
            {x: current.x + 1, y: current.y, direction: EAST}
        ];
        
        neighbors.forEach(neighbor => {
            let key = getKey(neighbor.x, neighbor.y);
            let bestState = grid.get(key);
            if (bestState === undefined) {
                // todo add to queue
            } else if (bestState.type === 0) {
                return;
            } else if (bestState.steps <= current.steps + 1) {
                return;
            } else {
                // todo update input with direction
                queue.push({
                    x: neighbor.x,
                    y: neighbor.y,
                    steps: current.steps + 1,
                    direction: neighbor.direction,
                    state: {
                        output: output,
                        pointer: pointer,
                        memory: memory.slice(),
                        relative: relative
                    
                    }
                });
            }
        })
    }

    return {value: answer};
}

function getKey(x, y) {
    return `${x},${y}`;
}