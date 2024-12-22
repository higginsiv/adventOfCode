import { Solution } from '#tools/solution.js';
import { dir } from 'async';

export default function solve({ lines, rawData }) {
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
                if (key === 'A') {
                    console.log(a, b, directionPadPriority.indexOf(a), directionPadPriority.indexOf(b));
                }
                return directionPadPriority.indexOf(a) - directionPadPriority.indexOf(b);
            });

            value.set(key, sorted.join(''));
        });
    });

    // console.log(directionGraph);
    // return new Solution(0);

    const answer = lines.reduce((acc, line) => {
        let numPadLoc = 'A';
        let dirPad1Loc = 'A';
        let dirPad2Loc = 'A';

        let numCommands = 0;
        let numPadOperations = line.split('');
        let numPadPath = '';
        numPadOperations.forEach((operation) => {
            console.log(operation, numPadLoc, numbersGraph.get(numPadLoc).get(operation));
            numPadPath += numbersGraph.get(numPadLoc).get(operation);
            numPadLoc = operation;
            numPadPath += 'A';
            // numPadLoc = 'A';
        });
        console.log('Directional 1: ', numPadPath, numPadPath.length);

        let dirPad1Operations = numPadPath.split('');
        let dirPad1Path = '';
        // console.log(dirPad1Operations)
        dirPad1Operations.forEach((dirPad1Operation) => {
            dirPad1Path += directionGraph.get(dirPad1Loc).get(dirPad1Operation);
            dirPad1Loc = dirPad1Operation;
            // console.log(dirPad1Loc)
            dirPad1Path += 'A';
            // dirPad1Loc = 'A';
        });
        console.log('Directional 2: ', dirPad1Path, dirPad1Path.length);

        let dirPad2Operations = dirPad1Path.split('');
        let dirPad2Path = '';
        dirPad2Operations.forEach((dirPad2Operation) => {
            dirPad2Path += directionGraph.get(dirPad2Loc).get(dirPad2Operation);
            dirPad2Loc = dirPad2Operation;
            dirPad2Path += 'A';
            // dirPad2Loc = 'A';
        });
        console.log('Directional 3: ', dirPad2Path, dirPad2Path.length);

        numCommands = dirPad2Path.length;
        console.log(numCommands);

        return acc + numCommands * parseInt(line);
    }, 0);
    return new Solution(answer);

    function fillGraph(pad, graph, includeA) {
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
                            // if (includeA) {
                            //     neighbor.path += 'A';
                            // }
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
}

// 102426 too low
// 154997 too low

// TODO is it because there are many different paths and the shortest might depend on the current position of the robots on each pad?

// <v<A >>^A vA ^A <vA <A A >>^A A vA <^A >A A vA ^A <vA >^A A <A >A <v<A >A >^A A A vA <^A >A
// <A   >A  v<<A A  >^A A  >A  vA  A  ^A  <vA  A A >^A
// ^    A    <   <  ^   ^   A  >   >  A   v   v  v  A
