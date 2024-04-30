module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => parseInt(x));
    const CHUNK_SIZE = 25;
    // derived from part 1
    const GOAL = 133015568;

    let index = 0;
    let total = 0;
    let smallest = Infinity;
    let largest = -Infinity;
    let offset = 0;

    while (true) {
        let current = data[index + offset];
        total += current;
        smallest = Math.min(smallest, current);
        largest = Math.max(largest, current);

        if (total > GOAL) {
            smallest = Infinity;
            largest = -Infinity;
            total = 0;
            offset++;
            index = 0;
        } else if (total === GOAL) {
            break;
        }
        index++;
    }

    const answer = smallest + largest;

    return { value: answer };
}
