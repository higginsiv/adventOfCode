module.exports = {solve: solve};

function solve({lines, rawData}) {
    let frequencies = new Set();
    lines = lines.map(Number);

    let i = 0;
    let answer = 0;
    while (true) {
        answer += lines[i];
        if (frequencies.has(answer)) {
            break;
        }
        frequencies.add(answer);
        i = (i + 1) % lines.length;
    }

    return {value: answer};
}