import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    const data = rawData.split(EOL + EOL).map((x) => x.split(EOL).map((y) => JSON.parse(y)));
    const [ORDERED, CHAOS, NEUTRAL] = [1, -1, 0];
    let indexSum = 0;

    function compare(left, right) {
        if (left != undefined && right == undefined) {
            return CHAOS;
        }
        const leftIsArray = Array.isArray(left);
        const rightIsArray = Array.isArray(right);

        if (!leftIsArray && !rightIsArray) {
            return left < right ? ORDERED : left > right ? CHAOS : NEUTRAL;
        } else if (!rightIsArray) {
            right = [right];
        } else if (!leftIsArray) {
            left = [left];
        }

        while (left.length > 0) {
            let subLeft = left.shift();
            let subRight = right.shift();
            let result = compare(subLeft, subRight);
            if (result === ORDERED) {
                return ORDERED;
            }
            if (result === CHAOS) {
                return CHAOS;
            }
        }

        if (right.length > 0) {
            return ORDERED;
        } else {
            return NEUTRAL;
        }
    }

    data.forEach((pair, index) => {
        let inOrder = true;
        for (let i = 0; i < pair[0].length; i++) {
            let left = pair[0][i];
            let right = pair[1][i];

            let result = compare(left, right);
            if (result === CHAOS) {
                inOrder = false;
                break;
            }
            if (result === ORDERED) {
                inOrder = true;
                break;
            }
        }

        if (inOrder) {
            indexSum += index + 1;
        }
    });

    const answer = indexSum;
    return { value: answer };
}
