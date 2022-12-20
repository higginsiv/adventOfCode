const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "20", "2"];
const KEY = 811589153;

class Point {
  value;
  index;
  visited = false;
  constructor(value, index) {
    this.value = value;
    this.index = index;
  }
}

let data = fr
  .getInput(year, day)
  .map((x, index) => new Point(parseInt(x) * KEY, index));

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < data.length; j++) {
    for (let k = 0; k < data.length; k++) {
      if (data[k].index === j) {
        let el = data.slice(k, k + 1)[0];
        data.splice(k, 1);
        data.splice((k + el.value) % data.length, 0, el);
        break;
      }
    }
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

console.log("Year " + year + " Day " + day + " Puzzle " + part + ": " + answer);
