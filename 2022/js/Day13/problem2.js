export default function solve({ lines, rawData }) {
    let data = lines.filter((x) => x !== '').map((x) => JSON.parse(x));
    const marker1 = [[2]];
    const marker2 = [[6]];

    data.push(marker1);
    data.push(marker2);
    const [ORDERED, CHAOS, NEUTRAL] = [-1, 1, 0];

    data.sort(compare);

    const answer = (data.indexOf(marker1) + 1) * (data.indexOf(marker2) + 1);

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

        for (let i = 0; i < left.length; i++) {
            let subLeft = left[i];
            let subRight = right[i];
            let result = compare(subLeft, subRight);
            if (result === ORDERED) {
                return ORDERED;
            }
            if (result === CHAOS) {
                return CHAOS;
            }
        }

        if (right.length > left.length) {
            return ORDERED;
        } else {
            return NEUTRAL;
        }
    }

    return { value: answer };
}
