const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2023', '20', '1'];
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

modules.forEach((module) => {
    module.destinations.forEach((destination) => {
        let destModule = modules.get(destination);
        if (destModule) {
            destModule.inputKeys.push(module.key);
        }
    });
});

let lowPulses = 0;
let highPulses = 0;

let buttonPresses = 1000;

for (let i = 0; i < buttonPresses; i++) {
    lowPulses++;
    let queue = [{ key: START }];

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
        }

        destinations.forEach((destination) => {
            if (module.status === LOW) {
                lowPulses++;
            } else {
                highPulses++;
            }

            let nextModule = modules.get(destination);
            if (!nextModule) {
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

function flipStatus(oldStatus) {
    return oldStatus === HIGH ? LOW : HIGH;
}

let answer = lowPulses * highPulses;
OUTPUT.output(YEAR, DAY, PART, answer);
