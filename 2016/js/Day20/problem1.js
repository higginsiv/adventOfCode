module.exports = { solve: solve };

function solve({ lines, rawData }) {
    lines = lines.map((line) => line.split('-').map(Number)).sort((a, b) => a[0] - b[0]);
    let min = 0;
    for (let line of lines) {
        if (line[0] > min) {
            break;
        }
        min = Math.max(min, line[1] + 1);
    }

    let answer = min;
    return { value: answer };
}
