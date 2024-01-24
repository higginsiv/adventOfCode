console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2019', '06', '1'];

class Planet {
  key;
  orbits;
  constructor(key, orbits) {
    this.key = key;
    this.orbits = orbits;
  }
}

let keysToPlanet = new Map();
const data = fr.getInput(year, day).forEach((line) => {
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

let keyToOrbits = new Map();

let answer = 0;
keysToPlanet.forEach((planet, key) => {
  let orbits = 0;
  while (planet.orbits != null) {
    orbits++;
    planet = planet.orbits;

    if (keyToOrbits.has(planet.key)) {
      orbits += keyToOrbits.get(planet.key);
      break;
    }
  }
  answer += orbits;

  keyToOrbits.set(key, orbits);
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
