import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const MAX_DEPTH = 25;
    const numbersGraph = new Map();
    const directionGraph = new Map();

    const numberPad = [
        ['7', '8', '9'],
        ['4', '5', '6'],
        ['1', '2', '3'],
        [null, '0', 'A'],
    ];

    const directionPad = [
        [null, '^', 'A'],
        ['<', 'v', '>'],
    ];

    fillGraph(numberPad, numbersGraph, false);
    fillGraph(directionPad, directionGraph, true);

    const numberPadPriority = ['^', '>', 'v', '<'];
    const directionPadPriority = ['>', '^', 'v', '<'];
    numbersGraph.forEach((value, key) => {
        value.forEach((ops, key) => {
            let sorted = ops.split('').sort((a, b) => {
                return numberPadPriority.indexOf(a) - numberPadPriority.indexOf(b);
            });
            value.set(key, sorted.join(''));
        });
    });

    directionGraph.forEach((value, key) => {
        value.forEach((ops, key) => {
            let sorted = ops.split('').sort((a, b) => {
                return directionPadPriority.indexOf(a) - directionPadPriority.indexOf(b);
            });

            value.set(key, sorted.join(''));
        });
    });

    let fastestCache = new Map();
    const answer = lines.reduce((acc, line) => {
        let total = fastestFromAToB(numbersGraph, 'A', line[0], 0);
        for (let i = 0; i < line.length - 1; i++) {
            total += fastestFromAToB(numbersGraph, line[i], line[i + 1], 0);
        }
        return acc + total * parseInt(line);
    }, 0);

    return new Solution(answer);

    function fillGraph(pad, graph) {
        for (let i = 0; i < pad.length; i++) {
            for (let j = 0; j < pad[i].length; j++) {
                if (pad[i][j] === null) {
                    continue;
                }
                let start = pad[i][j];
                graph.set(start, new Map());
                graph.get(start).set(start, '');

                let queue = [{ x: j, y: i, path: '' }];
                let visited = [start];

                while (queue.length > 0) {
                    let { x, y, path } = queue.shift();
                    let current = pad[y][x];
                    visited.push(current);

                    let neighbors = [];
                    if (x > 0) {
                        neighbors.push({ x: x - 1, y: y, path: path + '<' });
                    }
                    if (x < pad[0].length - 1) {
                        neighbors.push({ x: x + 1, y: y, path: path + '>' });
                    }
                    if (y > 0) {
                        neighbors.push({ x: x, y: y - 1, path: path + '^' });
                    }
                    if (y < pad.length - 1) {
                        neighbors.push({ x: x, y: y + 1, path: path + 'v' });
                    }

                    for (let neighbor of neighbors) {
                        let { x, y, path } = neighbor;
                        let next = pad[y][x];
                        if (next === null) {
                            continue;
                        }
                        if (!visited.includes(next)) {
                            queue.push(neighbor);
                            graph.get(start).set(next, neighbor.path);
                        }
                    }
                }
            }
        }
    }

    function canReverse(val1, val2) {
        if (['1', '4', '7'].includes(val1) && ['0', 'A'].includes(val2)) {
            return false;
        }

        if (['0', 'A'].includes(val1) && ['1', '4', '7'].includes(val2)) {
            return false;
        }

        if (['^', 'A'].includes(val1) && ['<'].includes(val2)) {
            return false;
        }

        if (['<'].includes(val1) && ['^', 'A'].includes(val2)) {
            return false;
        }

        return true;
    }

    function fastestFromAToB(graph, start, end, depth) {
        if (fastestCache.has(start + end + depth)) {
            return fastestCache.get(start + end + depth);
        }

        let options = [];
        let path = graph.get(start).get(end);
        options.push(path + 'A');
        if (canReverse(start, end)) {
            options.push(path.split('').reverse().join('') + 'A');
        }

        if (depth === MAX_DEPTH) {
            return Math.min(...options.map((option) => option.length));
        }

        let min = Infinity;
        options.forEach((option) => {
            let operations = option.split('');
            let total = fastestFromAToB(directionGraph, 'A', operations[0], depth + 1);
            for (let i = 0; i < operations.length - 1; i++) {
                total += fastestFromAToB(
                    directionGraph,
                    operations[i],
                    operations[i + 1],
                    depth + 1,
                );
            }
            min = Math.min(min, total);
        });
        fastestCache.set(start + end + depth, min);
        return min;
    }
}
