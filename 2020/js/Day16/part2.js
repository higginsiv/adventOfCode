import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    class Range {
        min;
        max;
        constructor(min, max) {
            this.min = min;
            this.max = max;
        }
    }

    let [KEY_INFO, YOUR_TICKET, TICKETS] = rawData.split(EOL + EOL);

    let keys = new Map();
    let keyNames = [];
    KEY_INFO.split(EOL).forEach((x) => {
        let name = x.substring(0, x.indexOf(':'));
        let rangesString = x.substring(x.indexOf(':') + 2);
        let ranges = rangesString.split(' or ').map((r) => {
            r = r.split('-').map((y) => parseInt(y));
            return new Range(...r);
        });
        keys.set(name, ranges);
        keyNames.push(name);
    });

    let possibleKeys = new Array(keyNames.length);
    for (let i = 0; i < possibleKeys.length; i++) {
        possibleKeys[i] = keyNames.slice();
    }

    YOUR_TICKET = YOUR_TICKET.split(EOL).map((t) => {
        t = t.split(',').map((x) => parseInt(x));
        return t;
    });
    // REALLY lazy parsing (removing the 'your ticket:' line)
    YOUR_TICKET.shift();

    TICKETS = TICKETS.split(EOL).map((t) => {
        t = t.split(',').map((x) => parseInt(x));
        return t;
    });
    // REALLY lazy parsing (removing the 'nearby tickets:' line)
    TICKETS.shift();

    TICKETS.forEach((ticket, u) => {
        ticket.forEach((field, index) => {
            let globalInRange = false;
            let badKeys = [];

            for (let i = possibleKeys[index].length - 1; i >= 0; i--) {
                let inRange = false;
                if (possibleKeys[index] != null) {
                    let ranges = keys.get(possibleKeys[index][i]);
                    for (let j = 0; j < ranges.length; j++) {
                        let min = ranges[j].min;
                        let max = ranges[j].max;
                        if (field >= min && field <= max) {
                            inRange = true;
                            globalInRange = true;
                        }
                    }
                }
                if (!inRange) {
                    badKeys.push(i);
                }
            }
            if (globalInRange) {
                for (let i = possibleKeys[index].length - 1; i >= 0; i--) {
                    if (badKeys.includes(i)) {
                        possibleKeys[index].splice(i, 1);
                    }
                }
            }
        });
    });

    let keyDeleted = true;
    while (keyDeleted) {
        keyDeleted = false;
        let keyToDelete;
        for (let i = 0; i < possibleKeys.length; i++) {
            let pks = possibleKeys[i];
            if (pks.length === 1) {
                keyToDelete = pks[0];
                for (let j = 0; j < possibleKeys.length; j++) {
                    if (j !== i && possibleKeys[j].includes(keyToDelete)) {
                        keyDeleted = true;
                        possibleKeys[j].splice(possibleKeys[j].indexOf(keyToDelete), 1);
                    }
                }
            }
        }
    }

    const answer = possibleKeys.reduce((total, curr, index) => {
        if (curr[0].indexOf('departure') != -1) {
            total *= YOUR_TICKET[0][index];
        }
        return total;
    }, 1);
    return { value: answer };
}
