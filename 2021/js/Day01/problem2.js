module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => parseInt(x));

    let numOfSlidingIncreases = 0;

    for (let i = 3; i < data.length; i++) {
        let current = data[i] + data[i - 1] + data[i - 2];
        let previous = data[i - 1] + data[i - 2] + data[i - 3];

        if (current > previous) {
            numOfSlidingIncreases++;
        }
    }
    return { value: numOfSlidingIncreases };
}
