module.exports = { solve: solve };
const { IntCode } = require('../common/IntCode.js');

function solve({ lines, rawData }) {
    let x = 0;
    let y = 10;

    const corners = [
        [99, 0],
        [99, 99],
        [0, 99],
    ];

    let baseMemory = rawData.split(',').map(Number);

    let hasHitBeamOnRow = false;
    let furthestLeftX = 0;
    let input = [];
    let output = [];
    let ic = new IntCode(rawData, null, 0, input, output);
    while (true) {
        let hasBeam = false;
        input.push(x);
        input.push(y);
        ic.setState({
            memory: baseMemory.slice(),
            relative: 0,
            pointer: 0,
        });
        let { output } = ic.run();
        let result = output.pop();
        if (result === 1) {
            hasBeam = true;
        }

        if (hasBeam) {
            if (!hasHitBeamOnRow) {
                furthestLeftX = x;
            }
            hasHitBeamOnRow = true;
            let allCorners = true;
            for (let i = 0; i < corners.length; i++) {
                let corner = corners[i];
                input.push(x + corner[0]);
                input.push(y + corner[1]);
                ic.setState({
                    memory: baseMemory.slice(),
                    relative: 0,
                    pointer: 0,
                });
                let { output } = ic.run();
                let result = output.pop();
                if (result !== 1) {
                    allCorners = false;
                    break;
                }
            }
            if (allCorners) {
                break;
            }
            x++;
        } else {
            if (hasHitBeamOnRow) {
                x = furthestLeftX;
                hasHitBeamOnRow = false;
                y++;
            } else {
                x++;
            }
        }
    }

    const answer = x * 10000 + y;
    return { value: answer };
}