import { Solution } from '#tools/solution.js';
import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    rawData = rawData.split(EOL + EOL);
    let towels = rawData[0].split(', ');
    let displays = rawData[1].split(EOL);

    let displayToValidCombinations = new Map();
    const answer = displays.reduce((acc, display) => {
        const validCombinations = getValidCombinations(display);
        if (validCombinations > 0) {
            return acc + 1;
        }
        return acc;
    }, 0);
    return new Solution(answer);

    function getValidCombinations(display) {
        if (display.length === 0) {
            return 1;
        }

        if (displayToValidCombinations.has(display)) {
            return displayToValidCombinations.get(display);
        }
        const count = towels.reduce((acc, towel) => {
            if (display.startsWith(towel)) {
                return acc + getValidCombinations(display.slice(towel.length));
            }
            return acc;
        }, 0);
        displayToValidCombinations.set(display, count);
        return count;
    }
}
