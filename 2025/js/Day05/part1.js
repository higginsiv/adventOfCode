import { Solution } from '#tools/solution.js';
import {EOL} from 'os';
export default function solve({ lines, rawData }) {
    let [ranges, ingredients] = rawData.split(EOL + EOL);

    ranges = ranges.split(EOL).map(line => {
        return line.split('-').map(Number);
    });

    ingredients = ingredients.split(EOL).map(line => Number(line));
    
    let fresh = 0;

    for (const ingredient of ingredients) {
        let isFresh = false;
        for (const [min, max] of ranges) {
            if (ingredient >= min && ingredient <= max) {
                isFresh = true;
                break;
            }
        }
        if (isFresh) {
            fresh++;
        }
    }
    const answer = fresh;
    return new Solution(answer);
}