console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2019', '06', '2'];

class Planet {
  key;
  orbits;
  constructor(key, orbits) {
    this.key = key;
    this.orbits = orbits;
  }
}

let keysToPlanet = new Map();
fr.getInput(year, day).forEach((line) => {
  let [planetKey1, planetKey2] = line.split(')');
  let planet1 = keysToPlanet.get(planetKey1);
  let planet2 = keysToPlanet.get(planetKey2);

  if (planet1 == null) {
    planet1 = new Planet(planetKey1);
    keysToPlanet.set(planetKey1, planet1);
  }

  if (planet2 == null) {
    keysToPlanet.set(planetKey2, new Planet(planetKey2, planet1));
  } else {
    planet2.orbits = planet1;
  }
});

let me = keysToPlanet.get('YOU');
let san = keysToPlanet.get('SAN');
let meToOrbits = new Map();
let sanToOrbits = new Map();

let orbits = 0;
while (me.orbits != null) {
  me = me.orbits;
  meToOrbits.set(me.key, orbits);
  orbits++;
}

orbits = 0;
while (san.orbits != null) {
  san = san.orbits;
  sanToOrbits.set(san.key, orbits);
  orbits++;
}

let answer = Infinity;
keysToPlanet.forEach((_, key) => {
  let meDist = meToOrbits.get(key) != null ? meToOrbits.get(key) : Infinity;
  let sanDist = sanToOrbits.get(key) != null ? sanToOrbits.get(key) : Infinity;

  let temp = meDist + sanDist;
  if (temp < answer) {
    answer = temp;
  }
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
