import { EOL } from 'os';
import * as MATH from '#tools/math.js';
export default function solve({ lines, rawData }) {
    const [LEFT, RIGHT] = ['L', 'R'];

    const DATA = rawData.split(EOL + EOL);

    class Node {
        key;
        left;
        right;
        constructor(key, left, right) {
            this.key = key;
            this.left = left;
            this.right = right;
        }
    }

    const DIRECTIONS = DATA[0].split('');

    let keyToNode = new Map();
    let endsInA = [];

    DATA[1].split(EOL).forEach((line) => {
        const [KEY, LEFT, RIGHT] = line.match(/[A-Z]{3}/g);
        keyToNode.set(KEY, new Node(KEY, LEFT, RIGHT));

        if (KEY.endsWith('A')) {
            endsInA.push(KEY);
        }
    });

    const MAX = DIRECTIONS.length - 1;

    let cycleSteps = [];
    endsInA.forEach((key) => {
        let currentNode = keyToNode.get(key);
        let steps = 0;
        let index = 0;
        while (!currentNode.key.endsWith('Z')) {
            if (DIRECTIONS[index] === LEFT) {
                currentNode = keyToNode.get(currentNode.left);
            } else {
                currentNode = keyToNode.get(currentNode.right);
            }

            index++;
            if (index > MAX) {
                index = 0;
            }

            steps++;
        }
        cycleSteps.push(steps);
    });

    const answer = cycleSteps.reduce(MATH.getLCM);
    return { value: answer };
}
