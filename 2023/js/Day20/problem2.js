const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const { getLCM } = require('../../../tools/math');
const [YEAR, DAY, PART] = ['2023', '20', '2'];
const [HIGH, LOW] = [1, 0];
const START = 'broadcaster';

let modules = new Map();
const DATA = fr.getInput(YEAR, DAY).forEach((line) => {
  let matches = line.match(/([%&]?\w+)/g);
  let key;
  let type;
  let destinations = [];
  let pulsesFromSource;
  let status = LOW;

  if (matches[0] !== START) {
    type = matches[0].charAt(0);
    key = matches[0].substring(1);
  }

  if (matches[0] === START) {
    key = START;
    pulsesFromSource = new Map();
    pulsesFromSource.set(START, HIGH);
  }

  for (let i = 1; i < matches.length; i++) {
    destinations.push(matches[i]);
  }

  modules.set(key, {
    key: key,
    type: type,
    destinations: destinations,
    pulses: pulsesFromSource ? pulsesFromSource : new Map(),
    status: status,
    rawPulses: [],
    inputKeys: [],
  });
});

let finalConjunction;

modules.forEach((module) => {
  module.destinations.forEach((destination) => {
    let destModule = modules.get(destination);
    if (destModule) {
      destModule.inputKeys.push(module.key);
    } else if (destination === 'rx') {
      finalConjunction = module.key;
    }
  });
});

let cycleKeysToTrack = modules.get(finalConjunction).inputKeys;

let cycles = new Map();

let startKeys = modules.get(START).destinations;

startKeys.forEach((startKey) => {
  let buttonPresses = 0;

  let cycleFound = false;
  while (!cycleFound) {
    buttonPresses++;
    let queue = [{ key: startKey }];

    while (queue.length > 0) {
      let current = queue.shift();
      let module = modules.get(current.key);
      let destinations = module.destinations;

      if (module.type === '%') {
        module.status = module.status ? module.status : LOW;
        let lastPulse = module.rawPulses.shift();
        if (lastPulse === HIGH) {
          continue;
        } else {
          module.status = flipStatus(module.status);
        }
      } else if (module.type === '&') {
        let allHigh = module.inputKeys.reduce((total, key) => {
          let pulse = module.pulsesFromSource.get(key);
          pulse = pulse ? pulse : LOW;
          return total && pulse === HIGH;
        }, true);

        module.status = allHigh ? LOW : HIGH;
        if (module.status === HIGH && cycleKeysToTrack.includes(module.key)) {
          if (cycles.get(module.key) == null) {
            cycles.set(module.key, buttonPresses);
            cycleFound = true;
            break;
          }
        }
      }

      destinations.forEach((destination) => {
        let nextModule = modules.get(destination);
        if (!nextModule) {
          modules.set(destination, {
            key: destination,
            type: null,
            destinations: [],
            pulses: new Map(),
            status: module.status,
            rawPulses: [],
            inputKeys: [module.key],
          });
          return;
        }
        if (nextModule.type === '%') {
          nextModule.rawPulses.push(module.status);
        } else if (nextModule.type === '&') {
          if (nextModule.pulsesFromSource == null) {
            nextModule.pulsesFromSource = new Map();
          }
          nextModule.pulsesFromSource.set(module.key, module.status);
        }

        queue.push({ key: destination });
      });
    }
  }
});

function flipStatus(oldStatus) {
  return oldStatus === HIGH ? LOW : HIGH;
}

let answer = [...cycles.values()].reduce(getLCM);
OUTPUT.output(YEAR, DAY, PART, answer);
