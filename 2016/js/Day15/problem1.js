module.exports = { solve: solve };

function solve({ lines, rawData }) {
    lines = lines.map((line, i) => {
        let [discNumber, positions, time, start] = line.match(/\d+/g).map(Number);
        return { discNumber, positions, start };
    });

    let time = 0;

    while (true) {
        if (lines.every((line) => (time + line.discNumber + line.start) % line.positions === 0)) {
            break;
        }
        time++;
    }

    let answer = time;
    return { value: answer };
}
