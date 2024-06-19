module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let hashes = new Map();
    let boxes = new Array(256).fill(null).map(() => []);

    const DATA = rawData.split(',').forEach((line) => {
        if (line.includes('=')) {
            let [label, focalLength] = line.split('=');
            let boxNumber = calculateHash(label);

            let box = boxes[boxNumber];
            let index = box.findIndex((item) => {
                return item.label === label;
            });

            if (index === -1) {
                box.push({
                    label,
                    focalLength,
                });
            } else {
                box[index].focalLength = focalLength;
            }
        } else if (line.includes('-')) {
            let [label, focalLength] = line.split('-');
            let boxNumber = calculateHash(label);

            let box = boxes[boxNumber];
            let index = box.findIndex((item) => {
                return item.label === label;
            });

            if (index !== -1) {
                box.splice(index, 1);
            }
        } else {
            console.log('ERRROR');
        }
    });

    function calculateHash(label) {
        if (hashes.has(label)) {
            return hashes.get(label);
        }
        let hashed = label.split('').reduce((subTotal, letter) => {
            return ((subTotal + letter.charCodeAt(0)) * 17) % 256;
        }, 0);
        hashes.set(label, hashed);
        return hashed;
    }

    const answer = boxes.reduce((total, box, boxNumber) => {
        return (
            total +
            box.reduce((subTotal, item, slot) => {
                return subTotal + (boxNumber + 1) * (slot + 1) * item.focalLength;
            }, 0)
        );
    }, 0);
    return { value: answer };
}
