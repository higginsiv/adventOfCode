const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '20', '1'];

class Point {
  value;
  index;
  visited = false;
  constructor(value, index) {
    this.value = value;
    this.index = index + value;
  }
}

let data = fr.getInput(year, day).map((x, index) => new Point(parseInt(x), index));

let i = 0;
while (i < data.length) {
  if (data[i].visited) {
    i++;
  } else {
    let el = data.slice(i, i + 1)[0];
    el.visited = true;
    data.splice(i, 1);
    data.splice((i + el.value) % data.length, 0, el);
    i = 0;
  }
}

let zeroIndex = data.reduce((ans, x, index) => {
  if (x.value === 0) {
    return index - 1;
  } else {
    return ans;
  }
}, 0);

const stack = data[((zeroIndex + 1000) % data.length) + 1].value;
const dubs = data[((zeroIndex + 2000) % data.length) + 1].value;
const andre = data[((zeroIndex + 3000) % data.length) + 1].value;

let answer = stack + dubs + andre;

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
