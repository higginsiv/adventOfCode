export default function solve({ lines, rawData }) {
    const data = lines.map((x) => parseInt(x));

    let numOfIncreases = 0;

    for (let i = 1; i < data.length; i++) {
        let current = data[i];
        let previous = data[i - 1];

        if (current > previous) {
            numOfIncreases++;
        }
    }
    return { value: numOfIncreases };
}
