import { IntCode } from '../common/IntCode.js';
const [EMPTY, WALL, BLOCK, HOR_PADDLE, BALL] = [0, 1, 2, 3, 4];
const [LEFT, NEUTRAL, RIGHT] = [-1, 0, 1];

export default function solve({ lines, rawData }) {
    let input = [];
    let ic = new IntCode(rawData, new Map([[0, 2]]), 0, input, []);
    let score;
    let paddle = 0;

    while (true) {
        const { output, complete, memory, relative, pointer } = ic.run();

        while (output.length > 0) {
            let x = output.shift();
            let y = output.shift();
            let tile = output.shift();

            if (x === -1 && y === 0) {
                score = tile;
            } else {
                if (tile === BALL) {
                    if (x < paddle) {
                        input.push(LEFT);
                    } else if (x === paddle) {
                        input.push(NEUTRAL);
                    } else if (x > paddle) {
                        input.push(RIGHT);
                    }
                }
                if (tile === HOR_PADDLE) {
                    paddle = x;
                }
            }
        }
        if (complete) {
            break;
        }
        ic.setState({ memory, pointer, relative });
    }
    const answer = score;

    return { value: answer };
}
