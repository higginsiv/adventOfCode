export default function solve({ lines, rawData }) {
    function getKey(x, y) {
        return `${x},${y}`;
    }

    let fabric = new Map();
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
                    if (!fabric.has(key)) {
                        fabric.set(key, 1);
                    } else {
                        fabric.set(key, fabric.get(key) + 1);
                    }
                }
            }
        });

    const answer = [...fabric.values()].filter((v) => v > 1).length;
    return { value: answer };
}
