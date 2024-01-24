module.exports = { solve: solve };

function solve({ lines, rawData }) {
    lines = lines.map(Number);
    let index = 0;
    let steps = 0;
    while (index >= 0 && index < lines.length) {
        let jump = lines[index];
        lines[index] += jump >= 3 ? -1 : 1;
        index += jump;
        steps++;
    }

    return { value: steps };
}
