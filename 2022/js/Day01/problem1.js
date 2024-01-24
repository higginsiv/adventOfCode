const fr = require('../../../tools/fileReader');
const { EOL } = require('os');

const year = '2022';
const day = '01';
const data = fr.getInput(year, day);

let elfCalories = [0];
let elfIndex = 0;
let calorieMax = 0;

data.forEach((element) => {
  if (element == '') {
    if (elfCalories[elfIndex] > calorieMax) {
      calorieMax = elfCalories[elfIndex];
    }
    elfIndex++;
    elfCalories[elfIndex] = 0;
  } else {
    elfCalories[elfIndex] += parseInt(element);
  }
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle 1: ' + calorieMax);
