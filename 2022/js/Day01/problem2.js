const fr = require('../../../tools/fileReader');
const { EOL } = require('os');

const year = '2022';
const day = '01';
const data = fr.getInput(year, day);

let elfCalories = [0];
let elfIndex = 0;

data.forEach((element) => {
    if (element == '') {
        elfIndex++;
        elfCalories[elfIndex] = 0;
    } else {
        elfCalories[elfIndex] += parseInt(element);
    }
});

elfCalories.sort((a, b) => {
    return b - a;
});

let calorieTotal = elfCalories[0] + elfCalories[1] + elfCalories[2];

console.log('Year ' + year + ' Day ' + day + ' Puzzle 2: ' + calorieTotal);
