import { Solution } from '../../../tools/solution.js';

export default function solve({ lines, rawData }) {
    const [ASC, DESC, FLAT] = [0, 1, 2];

    const answer = lines
        .map((line) => {
            line = line.split(' ').map(Number);
            return line;
        })
        .filter((line) => {
            return evaluateLine(line);
        }).length;

    return new Solution(answer);

    function evaluateLine(line, allowRetry = true) {
        let mode;

        for (let i = 0; i < line.length - 1; i++) {
            let currentMode = getMode(line, i);
            if (mode == null) {
                mode = currentMode;
            }

            if (
                currentMode !== mode ||
                currentMode === FLAT ||
                Math.abs(line[i] - line[i + 1]) > 3
            ) {
                return allowRetry && evaluateDampLines(line, i);
            }
        }

        return true;
    }

    function evaluateDampLines(line, i) {
        let safety =
            evaluateLine([...line.slice(0, i), ...line.slice(i + 1)], false) ||
            evaluateLine([...line.slice(0, i + 1), ...line.slice(i + 2)], false);

        if (i > 0 && !safety) {
            safety = safety || evaluateLine([...line.slice(0, i - 1), ...line.slice(i)], false);
        }

        return safety;
    }

    function getMode(line, i) {
        if (line[i] > line[i + 1]) {
            return DESC;
        } else if (line[i] < line[i + 1]) {
            return ASC;
        }
        return FLAT;
    }
}
