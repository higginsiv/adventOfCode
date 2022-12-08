const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "08", "1"];
const data = fr
  .getInput(year, day)
  .map((x) => x.split("").map((y) => parseInt(y)));

let numVisible = 0;

for (let x = 0; x < data.length; x++) {
  for (let y = 0; y < data[x].length; y++) {
    if (
      check(x, y, 1, 0, data[x][y], -Infinity) ||
      check(x, y, -1, 0, data[x][y], -Infinity) ||
      check(x, y, 0, 1, data[x][y], -Infinity) ||
      check(x, y, 0, -1, data[x][y], -Infinity)
    ) {
      numVisible++;
    }
  }
}

function check(x, y, xDelta, yDelta, originalHeight, newHeight) {
  if (newHeight >= originalHeight) {
    return false;
  }

  if (x === 0 || x === data.length - 1 || y === 0 || y === data[x].length - 1) {
    return true;
  }

  return check(
    x + xDelta,
    y + yDelta,
    xDelta,
    yDelta,
    originalHeight,
    data[x + xDelta][y + yDelta]
  );
}

console.log(
  "Year " + year + " Day " + day + " Puzzle " + part + ": " + numVisible
);
