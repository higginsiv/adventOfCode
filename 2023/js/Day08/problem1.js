module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const EOL = require('os').EOL;
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
    DATA[1].split(EOL).forEach((line) => {
        const [KEY, LEFT, RIGHT] = line.match(/[A-Z]{3}/g);
        keyToNode.set(KEY, new Node(KEY, LEFT, RIGHT));
    });

    let index = 0;
    let steps = 0;
    const MAX = DIRECTIONS.length - 1;

    let currentNode = keyToNode.get('AAA');
    while (currentNode.key !== 'ZZZ') {
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

    const answer = steps;
    return { value: answer };
}
