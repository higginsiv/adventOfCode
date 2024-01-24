// This solution is not original but is committed as a reference for future me.
const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '12', '2'];
const MATH = require('../../../tools/math');
const DATA = fr.getInput(YEAR, DAY).map((x) => x.split(' '));
const [OPERATIONAL, DAMAGED, UNKNOWN] = ['.', '#', '?'];
const SYMBOLS = [OPERATIONAL, DAMAGED];
const UNFOLDING_FACTOR = 5;

let cache = new Map();

let answer = DATA.reduce((total, curr) => {
  let springs = curr[0].split(' ');
  let damages = curr[1].match(/\d+/g).map((x) => parseInt(x));

  let bigSprings = Array(UNFOLDING_FACTOR).fill(springs).join(UNKNOWN);
  let bigDamages = Array(UNFOLDING_FACTOR).fill(damages).flat();

  return total + recurse(bigSprings, bigDamages);
}, 0);

function recurse(springs, damages) {
  if (!springs) {
    return !damages.length ? 1 : 0;
  }

  if (!damages.length) {
    return springs.includes(DAMAGED) ? 0 : 1;
  }

  const key = getCacheKey(springs, damages);

  if (cache.has(key)) {
    return cache.get(key);
  }

  let result = 0;

  if ([UNKNOWN, OPERATIONAL].includes(springs[0])) {
    result += recurse(springs.slice(1), damages);
  }

  if ([UNKNOWN, DAMAGED].includes(springs[0])) {
    if (
      damages[0] <= springs.length &&
      !springs.slice(0, damages[0]).includes('.') &&
      (damages[0] === springs.length || springs[damages[0]] !== '#')
    ) {
      result += recurse(springs.slice(damages[0] + 1), damages.slice(1));
    }
  }

  cache.set(key, result);
  return result;
}

function getCacheKey(group, damage) {
  let key = `${group}-${damage}`;
  return key;
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
