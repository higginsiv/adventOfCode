import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const answer = lines
        .map((line) => {
            line = line.match(/\d+/g).map(Number);
            return line;
        })
        .reduce((acc, line) => {
            const expected = line.shift();

            if (canReachExpectedTotal(line[0], 0, line, expected)) {
                return acc + expected;
            }
            return acc;
        }, 0);

    return new Solution(answer);

    function canReachExpectedTotal(current, operatorCount, line, expected) {
        if (operatorCount === line.length - 1) {
            return current === expected;
        }

        if (current > expected) {
            return false;
        }

        return (
            canReachExpectedTotal(
                current + line[operatorCount + 1],
                operatorCount + 1,
                line,
                expected,
            ) ||
            canReachExpectedTotal(
                current * line[operatorCount + 1],
                operatorCount + 1,
                line,
                expected,
            )
        );
    }
}
