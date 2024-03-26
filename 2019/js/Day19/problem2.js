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

    let hasHitBeamOnRow = false;
    let furthestLeftX = 0;
    while (true) {
        let hasBeam = false;

        let { output } = new IntCode(rawData, null, 0, [x, y], []).run();
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
                let { output } = new IntCode(
                    rawData,
                    null,
                    0,
                    [x + corner[0], y + corner[1]],
                    [],
                ).run();
                let result = output[0];
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