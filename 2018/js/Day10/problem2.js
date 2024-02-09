module.exports = { solve: solve };

function solve({ lines, rawData }) {
    lines = lines.map((line) => {
        line = line.match(/-?\d+/g).map(Number);
        return { x: line[0], y: line[1], vx: line[2], vy: line[3] };
    });

    let seconds = 0;
    while (true) {
        seconds++;
        lines.forEach((line) => {
            line.x += line.vx;
            line.y += line.vy;
        });

        let foundLetters = false;
        for (let i = 0; i < lines.length; i++) {
            let { x, y } = lines[i];

            if (
                lines.filter((line) => line.y === y + 1 && line.x === x).length &&
                lines.filter((line) => line.y === y + 2 && line.x === x).length &&
                lines.filter((line) => line.y === y + 3 && line.x === x).length &&
                lines.filter((line) => line.y === y + 4 && line.x === x).length &&
                lines.filter((line) => line.y === y + 5 && line.x === x).length &&
                lines.filter((line) => line.y === y + 6 && line.x === x).length &&
                lines.filter((line) => line.y === y + 7 && line.x === x).length
            ) {
                foundLetters = true;
                break;
            }
        }
        if (foundLetters) {
            break;
        }
    }

    return { value: seconds };
}
