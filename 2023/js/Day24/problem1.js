const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2023', '24', '1'];

const TEST_START = 200000000000000;
const TEST_END = 400000000000000;

let lines = [];
const DATA = fr
  .getInput(YEAR, DAY)
  .map((x) => x.match(/-?\d+/g).map((x) => parseInt(x)))
  .forEach((line) => {
    let [x, y, z] = [line[0], line[1], line[2]];
    let [vx, vy, vz] = [line[3], line[4], line[5]];

    let m = vy / vx;

    let b = y - m * x;

    lines.push({
      m: m,
      b: b,
      startX: x,
      xDir: vx > 0 ? 1 : -1,
      yDir: vy > 0 ? 1 : -1,
    });
  });

let intersections = 0;
for (let i = 0; i < lines.length; i++) {
  for (let j = i + 1; j < lines.length; j++) {
    intersections += doLinesIntersectInRanges(lines[i], lines[j], TEST_START, TEST_END);
  }
}

function doLinesIntersectInRanges(line1, line2, rangeStart, rangeEnd) {
  let slopeDelta = line1.m - line2.m;
  if (slopeDelta === 0) {
    return 0;
  }
  let x = (line2.b - line1.b) / slopeDelta;
  let y = line1.m * x + line1.b;

  let doLinesIntersectInRange =
    x >= rangeStart && x <= rangeEnd && y >= rangeStart && y <= rangeEnd;
  let isIntersectionInFutureForLine1 = line1.xDir > 0 ? x >= line1.startX : x <= line1.startX;
  let isIntersectionInFutureForLine2 = line2.xDir > 0 ? x >= line2.startX : x <= line2.startX;

  return doLinesIntersectInRange && isIntersectionInFutureForLine1 && isIntersectionInFutureForLine2
    ? 1
    : 0;
}

let answer = intersections;
OUTPUT.output(YEAR, DAY, PART, answer);
