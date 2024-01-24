const fr = require('../../../tools/fileReader');
const year = '2022';
const day = '02';

const throwValues = new Map([
    ['A', 1],
    ['B', 2],
    ['C', 3],
    ['X', 1],
    ['Y', 2],
    ['Z', 3],
]);

const points = new Map([
    [2, 0],
    [0, 3],
    [1, 6],
    [-1, 0],
    [-2, 6],
]);

const data = fr
    .getInput(year, day)
    .map((x) => {
        let battle = x.split(' ').map((y) => throwValues.get(y));
        let result = battle[1] - battle[0];
        return points.get(result) + battle[1];
    })
    .reduce((previous, current) => previous + current);

console.log('Year ' + year + ' Day ' + day + ' Puzzle 1: ' + data);
