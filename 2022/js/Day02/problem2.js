const fr = require('../../../tools/fileReader');
const year = '2022';
const day = '02';

const throwValues = new Map([
    ['A', 1],
    ['B', 2],
    ['C', 3],
    ['X', 0],
    ['Y', 3],
    ['Z', 6],
]);

// map of (their throw + my win/loss/draw points) to what I must have thrown
const points = new Map([
    [1, 3],
    [4, 1],
    [7, 2],
    [2, 1],
    [5, 2],
    [8, 3],
    [3, 2],
    [6, 3],
    [9, 1],
]);

const data = fr
    .getInput(year, day)
    .map((x) => {
        let battle = x.split(' ').map((y) => throwValues.get(y));
        let result = battle[1] + battle[0];
        return points.get(result) + battle[1];
    })
    .reduce((previous, current) => previous + current);

console.log('Year ' + year + ' Day ' + day + ' Puzzle 2: ' + data);
