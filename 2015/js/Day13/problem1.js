console.time();
const { map } = require('async');
const fr = require('../../../tools/fileReader');
const MATH = require('../../../tools/math');

const [year, day, part] = ['2015', '13', '1'];

let people = new Map();
fr.getInput(year, day).forEach((x) => {
  x = x.replace(' would ', ' ');
  x = x.replace(' happiness units by sitting next to ', ' ');
  x = x.replace('.', '');

  const [NAME, DIRECTION, NUMBER, GUEST] = x.split(' ');

  let person = people.get(NAME);
  if (person == null) {
    person = new Map();
    people.set(NAME, person);
  }

  person.set(GUEST, DIRECTION == 'gain' ? parseInt(NUMBER) : -parseInt(NUMBER));
});

let perms = MATH.permute([...people.keys()]);

let answer = perms.reduce((total, curr, index) => {
  let happiness = 0;
  for (let i = 0; i < curr.length; i++) {
    let partnerAIndex = i - 1 < 0 ? curr.length - 1 : i - 1;
    let partnerBIndex = i + 1 >= curr.length ? 0 : i + 1;

    let partnerAHappiness =
      people.get(curr[i]).get(curr[partnerAIndex]) == null
        ? 0
        : people.get(curr[i]).get(curr[partnerAIndex]);
    let partnerBHappiness =
      people.get(curr[i]).get(curr[partnerBIndex]) == null
        ? 0
        : people.get(curr[i]).get(curr[partnerBIndex]);

    happiness += partnerAHappiness + partnerBHappiness;
  }

  return happiness > total ? happiness : total;
}, -Infinity);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
