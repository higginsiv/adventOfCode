const fr = require('../../../tools/fileReader');
let data = fr.getInput('2021', '06', ',').map((x) => parseInt(x));

const numOfDays = 80;
const fishReset = 6;
const fishNew = 8;

for (let i = 0; i < numOfDays; i++) {
  let newFish = [];
  data.forEach((fish, index) => {
    data[index]--;
    if (data[index] === -1) {
      data[index] = fishReset;
      newFish = newFish.concat([fishNew]);
    }
  });
  data = data.concat(newFish);
}

console.log('Day 6 Puzzle 1: ' + data.length);
