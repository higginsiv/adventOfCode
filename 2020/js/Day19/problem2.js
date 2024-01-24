console.time();
const fr = require('../../../tools/fileReader');
const { EOL } = require('os');
const { getSystemErrorMap } = require('util');
const { exit } = require('process');
const [year, day, part] = ['2020', '19', '2'];
const data = fr.getInput(year, day, EOL + EOL);
const SELF = ' SELF ';
const LEFT = ' LEFT ';
const OUT = ' OUT ';
const PERM_LENGTH = 5;
class Rule {
    key;
    validStrings;
    children;
    constructor(key, children) {
        this.key = key;
        this.children = children;
    }
}

class WildString {
    eight;
    eleven;
    staticEight;
    staticEleven;
    eightRepeated = '';
    elevenRepeated = '';
    constructor(eight, eleven, staticEight, staticEleven) {
        this.eight = eight;
        this.eleven = eleven;
        this.staticEight = staticEight;
        this.staticEleven = staticEleven;
    }
}
let keysToRules = new Map();
data[0].split(EOL).forEach((line) => {
    if (line === '8: 42') {
        line = '8: 42 | 42 8';
    } else if (line === '11: 42 31') {
        line = '11: 42 31 | 42 11 31';
    }
    line = line.split(': ');
    key = parseInt(line[0]);
    values = line[1].split(' | ').map((opt) => {
        opt = opt.split(' ').map((r) => {
            if (r.indexOf('"') !== -1) {
                r = r.replaceAll('"', '');
                return r;
            }
            return parseInt(r);
        });
        return opt;
    });
    keysToRules.set(key, new Rule(key, values));
});

buildRule(0);

let validStrings = [];
keysToRules.get(0).validStrings.forEach((x) => {
    if (x.includes(SELF)) {
        // TODO Clean up logic that makes this check needed
    } else {
        validStrings.push(x);
    }
});

let testStrings = data[1].split(EOL);

let total = 0;
for (let i = testStrings.length - 1; i >= 0; i--) {
    let curr = testStrings[i];

    if (validStrings.includes(curr)) {
        total++;
        testStrings.splice(i, 1);
    }
}

let rightSide = keysToRules.get(31).validStrings;
let leftSide = keysToRules.get(42).validStrings;

// Assume all valid string permutations are the same length
let permLength = rightSide[0].length;
for (let i = 0; i < testStrings.length; i++) {
    let curr = testStrings[i];
    let startLength = curr.length;

    let doneWithRight = false;

    let numOfRightSideRemoved = 0;
    while (curr.length > permLength * (numOfRightSideRemoved + 1) && !doneWithRight) {
        doneWithRight = true;
        for (let j = 0; j < rightSide.length; j++) {
            let stringToRemove = rightSide[j];
            let lastIndex = curr.lastIndexOf(stringToRemove);
            if (lastIndex === curr.length - permLength) {
                curr = curr.substring(0, lastIndex);
                numOfRightSideRemoved++;
                if (curr.length > permLength * (numOfRightSideRemoved + 1)) {
                    // Have to make sure ALL sections aren't eaten up by the right side (key value 31). Last 2 MUST be from left side (42).
                    doneWithRight = false;
                } else {
                    break;
                }
            }
        }
    }
    if (curr.length === startLength) {
        // This means not a single right side (31) was removed from the end of the string and therefore it is invalid
        continue;
    }

    if (curr.length < (numOfRightSideRemoved + 1) * permLength) {
        // This means that more right sides (31) were removed than there are room for cooresponding left sides (42)
        continue;
    }

    let doneWithLeft = false;
    while (curr.length > 0 && !doneWithLeft) {
        doneWithLeft = true;
        for (let j = 0; j < leftSide.length; j++) {
            let stringToRemove = leftSide[j];
            let lastIndex = curr.lastIndexOf(stringToRemove);
            if (lastIndex === curr.length - permLength) {
                curr = curr.substring(0, lastIndex);
                doneWithLeft = false;

                if (curr.length === 0) {
                    total++;
                    break;
                }
            }
        }
    }
}

function buildRule(key) {
    let rule = keysToRules.get(key);
    let validStrings = [];
    if (rule.validStrings != null) {
        return rule.validStrings;
    } else {
        rule.children.forEach((child) => {
            let newChildRule = [];
            child.forEach((childKey) => {
                let newChildKeyRule = [];
                let expression;
                if (childKey === key) {
                    expression = [SELF];
                } else if (isNaN(childKey)) {
                    expression = [childKey];
                } else {
                    expression = buildRule(childKey);
                }
                if (newChildRule.length === 0) {
                    newChildRule = expression;
                } else {
                    for (let i = 0; i < newChildRule.length; i++) {
                        for (let j = 0; j < expression.length; j++) {
                            newChildKeyRule.push(newChildRule[i] + expression[j]);
                        }
                    }
                    newChildRule = newChildKeyRule;
                }
            });
            newChildRule.forEach((x) => validStrings.push(x));
        });
        rule.validStrings = validStrings;
        return rule.validStrings;
    }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + total);
console.timeEnd();
