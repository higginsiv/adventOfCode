const fr = require('../../../tools/fileReader');
const data = fr.getInput('2021', '02');

let horizontal = 0;
let depth = 0;

data.forEach(function (element) {
    let movement = element.split(' ');
    if (movement[0] === 'forward') {
        horizontal += parseInt(movement[1]);
    } else if (movement[0] === 'down') {
        depth += parseInt(movement[1]);
    } else if (movement[0] === 'up') {
        depth -= parseInt(movement[1]);
    }
});

console.log('Day 2 Puzzle 1: ' + horizontal * depth);
