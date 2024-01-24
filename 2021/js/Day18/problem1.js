const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2021', '18', '1'];

const LEFT = '[';
const RIGHT = ']';
const DELIM = ',';

class Pair {
  left;
  right;
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
}

const data = fr.getInput(year, day).map((x) => buildPair(x));

console.log(data);

function buildPair(raw, parent) {
  raw = raw.substring(1, raw.length - 1);
  let left;
  let right;

  if (raw.charAt(0) !== LEFT) {
    const parseIndex = raw.indexOf(DELIM) > 0 ? raw.indexOf(DELIM) : raw.length;
    console.log(raw.substring(0, parseIndex));
    left = parseInt(raw.substring(0, raw.indexOf(DELIM)));
  }

  if (raw.charAt(raw.length - 1) !== RIGHT) {
    const parseIndex = raw.lastIndexOf(DELIM) >= 0 ? raw.lastIndexOf(DELIM) + 1 : 1;
    right = parseInt(raw.substring(parseIndex));
  }

  if (left != null && right != null) {
    return new Pair(left, right);
  } else if (left == null && right == null) {
    return buildPair(raw);
  } else if (left != null) {
    return new Pair(left, buildPair(raw.substring(raw.indexOf(DELIM) + 1)));
  } else if (right != null) {
    // todo separate left from right
    return new Pair(buildPair(raw.substring(0, raw.lastIndexOf(DELIM))), right);
  }
}

let sum = data.reduce((total, curr, index) => {
  if (index === 0) {
    return curr;
  } else {
    let p = new Pair(total, curr);
  }
}, 0);

function reduce(snailNum) {
  let curr = snailNum;
  let jumps = 0;
  while (true) {}
}

let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
