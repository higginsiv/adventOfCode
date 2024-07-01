import { add, buildTree, findMagnitude } from './problem1.js';
export default function solve({ lines, rawData }) {
    let highestMagnitude = -Infinity;

    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            let snailNumber1 = buildTree(JSON.parse(lines[i]));
            let snailNumber2 = buildTree(JSON.parse(lines[j]));
            let snailNumber = add(snailNumber1, snailNumber2);
            let magnitude = findMagnitude(snailNumber);
            if (magnitude > highestMagnitude) {
                highestMagnitude = magnitude;
            }

            snailNumber1 = buildTree(JSON.parse(lines[i]));
            snailNumber2 = buildTree(JSON.parse(lines[j]));
            snailNumber = add(snailNumber2, snailNumber2);
            magnitude = findMagnitude(snailNumber);
            if (magnitude > highestMagnitude) {
                highestMagnitude = magnitude;
            }
        }
    }

    const answer = highestMagnitude;
    return { value: answer };
}
