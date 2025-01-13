import { IntCode } from '../common/IntCode.js';

export default function solve({ lines, rawData }) {
    let x = 0;
    let y = 150;

    const corners = [
        [99, 0],
        [99, -99],
        [0, -99],
    ];

    const baseMemory = rawData.split(',').map(Number);

    let input = [];
    let output = [];
    let ic = new IntCode(rawData, null, 0, input, output);

    while (true) {
        // Find furthest left on row that has beam
        let hasBeam = false;
        while (!hasBeam) {
            hasBeam = checkPoint(x, y, input, ic);
            if (!hasBeam) {
                x++;
            }
        }

        // Check other 3 corners
        for (let i = 0; i < corners.length; i++) {
            let [dx, dy] = corners[i];
            if (!checkPoint(x + dx, y + dy, input, ic)) {
                hasBeam = false;
                break;
            }
        }

        if (hasBeam) {
            break;
        }
        y++;
    }

    // Subtract 99 from y to get the top left corner of the square
    const answer = x * 10000 + (y - 99);
    return { value: answer };

    function checkPoint(x, y, input, ic) {
        if (x < 0 || y < 0) {
            return false;
        }

        input.push(x);
        input.push(y);
        ic.setState({
            memory: baseMemory.slice(),
            relative: 0,
            pointer: 0,
        });
        let { output } = ic.run();
        return output.pop() === 1;

    }
}
