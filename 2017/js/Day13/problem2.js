module.exports = { solve: solve };

function solve({ lines, rawData }) {
    lines = lines.map((lines) => lines.match(/\d+/g).map(Number));
    let answer = 1;
    while (true) {
        let caught = false;
        for (let i = 0; i < lines.length; i++) {
            const [depth, range] = lines[i];
            caught = (depth + answer) % ((range - 1) * 2) === 0;
            if (caught) {
                answer++;
                break;
            }
        }
        if (!caught) {
            break;
        }
    }

    return { value: answer };
}
