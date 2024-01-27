module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let lengths = rawData.split(',').map((x) => parseInt(x));
    let numbers = new Array(256).fill(0).map((_, i) => i);
    let currentPosition = 0;
    let skipSize = 0;

    for (let length of lengths) {
        let temp = numbers.slice();
        for (let i = 0; i < length; i++) {
            let index = (currentPosition + i) % numbers.length;
            let reverseIndex = (currentPosition + length - i - 1) % numbers.length;
            numbers[index] = temp[reverseIndex];
        }
        currentPosition = (currentPosition + length + skipSize) % numbers.length;
        skipSize++;
    }

    const answer = numbers[0] * numbers[1];
    return { value: answer };
}
