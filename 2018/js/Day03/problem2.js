export default function solve({ lines, rawData }) {
    function getKey(x, y) {
        return `${x},${y}`;
    }

    let fabric = new Map();
    let claimByPoints = new Map();

    lines
        .map((line) => {
            let digits = line.match(/\d+/g).map(Number);

            return {
                id: digits[0],
                topLeft: [digits[1], digits[2]],
                topRight: [digits[1] + digits[3] - 1, digits[2]],
                bottomLeft: [digits[1], digits[2] + digits[4] - 1],
                bottomRight: [digits[1] + digits[3] - 1, digits[2] + digits[4] - 1],
            };
        })
        .forEach((line) => {
            for (let x = line.topLeft[0]; x <= line.bottomRight[0]; x++) {
                for (let y = line.topLeft[1]; y <= line.bottomRight[1]; y++) {
                    let key = getKey(x, y);
                    if (!claimByPoints.has(line.id)) {
                        claimByPoints.set(line.id, []);
                    }
                    claimByPoints.get(line.id).push(key);
                    if (!fabric.has(key)) {
                        fabric.set(key, 1);
                    } else {
                        fabric.set(key, fabric.get(key) + 1);
                    }
                }
            }
        });

    const answer = [...claimByPoints.keys()].filter((v) => {
        return claimByPoints.get(v).every((key) => fabric.get(key) === 1);
    })[0];

    return { value: answer };
}
