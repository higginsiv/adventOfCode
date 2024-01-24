// TODO try solution that involves LCM and offsets
console.time();
const math = require('../../../tools/math');
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '13', '2'];
const data = fr.getInput(year, day);

class Train {
  id;
  offset;
  constructor(id, offset) {
    this.id = id;
    this.offset = offset;
  }
}

let bestId;
let bestWaitTime = Infinity;
let gaps = 0;
let trains = [];

data[1].split(',').forEach((x) => {
  if (x !== 'x') {
    x = new Train(parseInt(x), gaps);
    trains.push(x);
  }
  gaps++;
});

trains.sort((a, b) => b.id - a.id);
// console.log(trains)

let biggestTrain = trains[0];
let time = biggestTrain.id;
let allGood = false;
while (!allGood) {
  time += biggestTrain.id;
  allGood = true;
  for (let i = 1; i < trains.length; i++) {
    let currTrain = trains[i];
    let val = (time + (currTrain.offset - biggestTrain.offset)) % currTrain.id;

    if (val !== 0) {
      allGood = false;
      break;
    }
  }
}
let answer = time - biggestTrain.offset;
// console.log(trains)
// 3 % x === 5 % (x + 1) === 0
// let answer = bestId * bestWaitTime;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();

// 0 = t % id + (t + gap) % id2

// id * x = t => x = t / id
// id2 * y = t + g
// id3 * z = t + g2

// 17 * c1 = t
// 13 * c2 = t + 2
// 19 * c3 = t + 3

// 6 4 == 2
// 12 8 == 4
// 18 12 == 6
// 24 16 == 8

// 7 vs 13
// 7 = 6 behind
// 14 = 12 behind
// 21 = 5 behind
// 28 = 11 behind
// 35 = 4 behind
// 42 = 10 behind
// 49 = 3 behind
// 56 = 9 behind
// 63 = 2 behind
// 70 = 8 behind
// 77 = 1 behind
// 84 = 7 behind
// 91 = 0 behind
// 98 = 6 behind
// 105 = 12 behind

// x is smallest train
// x and y
// x*y gives a time where the delta is zero
// ??? use some logic to find a starting time where difference is offset
// every y from that point the difference is the offset
// do this for every train combo with x
