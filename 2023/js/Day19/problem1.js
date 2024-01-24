const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '19', '1'];
const EOL = require('os').EOL;
const START = 'in';
const [ACCEPTED, REJECTED] = ['A', 'R'];

let workflows = new Map();
const DATA = fr.getInput(YEAR, DAY, EOL + EOL);

DATA[0].split(EOL).forEach((line) => {
  line = line.replace('{', ' ');
  line = line.replace('}', '');
  let [key, rules] = line.split(' ');

  rules = rules.split(',');
  rules = rules.map((rule, index) => {
    if (index === rules.length - 1) {
      return { destination: rule };
    }

    let [evaluation, destination] = rule.split(':');
    let [_, category, symbol, number] = evaluation.match(/(\w+)([<>])(\d+)/);
    number = parseInt(number);

    return {
      category,
      symbol,
      number,
      destination,
    };
  });

  workflows.set(key, rules);
});

let answer = DATA[1]
  .split(EOL)
  .map((line) => {
    let keyValues = new Map();
    line = line.replace('{', '');
    line = line.replace('}', '');
    line = line.split(',').forEach((value) => {
      value = value.split('=');
      keyValues.set(value[0], parseInt(value[1]));
    });
    return keyValues;
  })
  .reduce((total, curr) => {
    let location = START;
    while (true) {
      if (location === ACCEPTED) {
        return total + (curr.get('x') + curr.get('m') + curr.get('a') + curr.get('s'));
      } else if (location === REJECTED) {
        return total;
      }

      let rules = workflows.get(location);
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (!rule.category) {
          location = rule.destination;
          break;
        } else {
          let categoryValue = curr.get(rule.category);
          if (rule.symbol === '<') {
            if (categoryValue < rule.number) {
              location = rule.destination;
              break;
            }
          } else if (rule.symbol === '>') {
            if (categoryValue > rule.number) {
              location = rule.destination;
              break;
            }
          }
        }
      }
    }
  }, 0);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
