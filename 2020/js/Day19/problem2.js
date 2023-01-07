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
print(42);
console.log('***')
print(31);
// exit(0)
function print(key) {
    let rule = keysToRules.get(key);
    rule.validStrings.forEach((x) => console.log(x));
}

// let passingStrings = new Set();
let validStrings = [];
let wildStrings = [];
keysToRules.get(0).validStrings.forEach((x) => {
    let eight;
    let eleven;
    let staticEight;
    let staticEleven;
    // if (x.includes(LEFT)) {
    //     let strings = x.split(' ');
    //     eight = strings[0];

    //     if (x.includes(OUT)) {
    //         eleven = [strings[2], strings[4]]
    //     } else {
    //         staticEleven = strings[2];
    //     }
    //     wildStrings.push(new WildString(eight, eleven, staticEight, staticEleven));
    // } else if (x.includes(OUT)) {
    //     let strings = x.split(' ');
    //     staticEight = x[0];
    //     eleven = [strings[1], strings[3]];
    //     wildStrings.push(new WildString(eight, eleven, staticEight, staticEleven));
    // }
    if (x.includes(LEFT) || x.includes(OUT)) {
        let strings = x.split(' ');
        // console.log(strings);
        let eight;
        let eleven;
        // TODO ugly ass strings
        // TODO I'm currently dropping non wild parts
        if (strings.includes('LEFT')) {
            eight = strings[strings.indexOf('LEFT') - 1];
        } else {
            eight = strings[0];
        }
        if (strings.includes('OUT')) {
            eleven = [strings[strings.indexOf('OUT') - 1], strings[strings.indexOf('OUT') + 1]]
        } else {
            // TODO this is going to result in a lot of invalid strings, but should also capture the valid ones
            // console.log(strings[2])
            eleven = [strings[2], '']
        }
        wildStrings.push(new WildString(eight, eleven));
        // console.log(wildStrings[wildStrings.length - 1])
    } else {
    // else {
        validStrings.push(x);
    }
    // if (x.indexOf(OUT) !== -1) {
    //     // console.log(x);
    //     let strings = x.split(OUT);
    //     wildStrings.push(strings);
    // } else {
    //     validStrings.push(x);
    // }
});

// console.log(validStrings.length);
// console.log(wildStrings.length);

// console.log(keysToRules.get(8).validStrings);
print(42)
console.log('***')
print(31)
console.log('***')
// print(11)
// console.log(keysToRules.get(31).validStrings);

// console.log(wildStrings[0]);
let testStrings = data[1].split(EOL);

let total = 0;
for (let i = testStrings.length - 1; i >= 0; i--) {
    let curr = testStrings[i];

    if (validStrings.includes(curr)) {
        total++;
        testStrings.splice(i, 1);
    }
}

// Attempt at subtracting 31 from each test string until I can't, then subtracting 42 until empty

let rightSide = keysToRules.get(31).validStrings;
let leftSide = keysToRules.get(42).validStrings;

// Assume all are the same length
let permLength = rightSide[0].length;
for (let i = 0; i < testStrings.length; i++) {
    let curr = testStrings[i];
    let startLength = curr.length;

    let saved = curr;
    let doneWithRight = false;

    let numOfRightSideRemoved = 0;
    while (curr.length > (permLength * 2) && !doneWithRight) {
        doneWithRight = true;
        for (let j = 0; j < rightSide.length; j++) {
            let stringToRemove = rightSide[j];
            let lastIndex = curr.lastIndexOf(stringToRemove);
            if (lastIndex === curr.length - permLength && lastIndex >= permLength * 2) {
                curr = curr.substring(0, lastIndex);
                numOfRightSideRemoved++;
                if (curr.length > permLength * 2) {
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

    if (curr.length < (numOfRightSideRemoved * permLength + permLength)) {
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
                    // console.log(saved)
                    break;
                }
            }
        }
    }
}


// END ATTEMPT
// let maxLength = testStrings.reduce((total, curr) => {
//     return curr.length > total ? curr.length : total;
// }, 0);
// // console.log(maxLength)
// // console.log(wildStrings.length)
// // console.log(testStrings)
// for (let i = 0; i < wildStrings.length; i++) {
//     if (testStrings.length === 0) {
//         break;
//     }
//     let wildString = wildStrings[i];
            
//     let wildPerms = [['','']];
//     let wild;
//     do {
//         let currLength = wildPerms.length;
//         for (let j = 0; j < currLength; j++) {
//             let [eightRepeated, elevenRepeated] = wildPerms.shift();
            
//             // add 8 static 11
//             // static 8 add 11
//             // add 8 add 11
//             let eightOnly;
//             let elevenOnly;
//             let both;
//             // console.log(eightRepeated);
//             // console.log(elevenRepeated);
//             // Results in invalid on first go
//             if (wildString.eight != null) {
//                 eightOnly = [eightRepeated.concat(wildString.eight), elevenRepeated];
//                 wildPerms.push(eightOnly);
//             }

//             // Results in invalid on first go
//             if (wildString.eleven != null) {
//                 elevenOnly = [eightRepeated, "".concat(wildString.eleven[0], elevenRepeated, wildString.eleven[1])];
//                 wildPerms.push(elevenOnly);
//             }

//             if (wildString.eight != null & wildString.eleven != null) {
//                 both = [eightRepeated.concat(wildString.eight), "".concat(wildString.eleven[0], elevenRepeated, wildString.eleven[1])];
//                 wildPerms.push(both);
//             }
//         }

//         // console.log(wildPerms.length)
//         for (let j = wildPerms.length - 1; j >= 0; j--) {

            
//         // for (let i = 0; i < wildPerms.length; i++) {
//             let [left, right] = wildPerms[j];
//             wild = left.concat(right);

//             if (wild.length > maxLength) {
//                 wildPerms.splice(j, 1);
//                 continue;
//             }
//             if (testStrings.includes(wild)) {
//                 console.log('match')
//                 total++;
//                 testStrings.splice(testStrings.indexOf(wild), 1);
//             } else {
//                 // console.log(wild)
//             }
//         }
//         // if (wildString.eight != null) {
//         //     wildString.eightRepeated = wildString.eightRepeated.concat(wildString.eight);
//         // }
//         // if (wildString.eleven != null) {
//         //     wildString.elevenRepeated = "".concat(wildString.eleven[0], wildString.elevenRepeated, wildString.eleven[1]);
//         // }
//         // wild = wildString.eightRepeated.concat(wildString.elevenRepeated);
//         // console.log(wild)
//     } while (wildPerms.length > 0); // {
//         // console.log(wildPerms.length)
//         // console.log(wild)
//         // if (testStrings.includes(wild)) {
//         //     console.log('match')
//         //     total++;
//         //     testStrings.splice(testStrings.indexOf(wild), 1);
//         // }
//    // }
// }
// let answer = data[1].split(EOL).reduce((total, curr) => {
//     // if (passingStrings.has(curr)) {
//     //     total++;
//     //     return total;
//     // }
//     if (validStrings.includes(curr)) {
//         // passingStrings.add(curr);
//         total++;
//         return total;
//     } else {
//         for (let i = 0; i < wildStrings.length; i++) {
//             // let test = curr;
//             // let [left, right] = wildStrings[i];
//             let wildString = wildStrings[i];
            
//             // let potentialPasses = new Set();
//             // let levelDown = false;
//             let wild;
//             do {
//                 if (wildString.eight != null) {
//                     wildString.eightRepeated = wildString.eightRepeated.concat(wildString.eight);
//                 }
//                 if (wildString.eleven != null) {
//                     wildString.elevenRepeated = "".concat(wildString.eleven[0], wildString.elevenRepeated, wildString.eleven[1]);
//                 }
//                 wild = wildString.eightRepeated.concat(wildString.elevenRepeated);
//             } while (wild.length <= curr.length) {
//                 if (wild === curr) {
//                     total++;
//                     return total;
//                 }
//             }
//             // while (test.length > 0) {
//             //     // console.log(test)
//             //     let leftIndex = test.indexOf(left);
//             //     let rightIndex = test.lastIndexOf(right);
//             //     if (
//             //         leftIndex === 0 &&
//             //         rightIndex === test.length - right.length - 1
//             //     ) {
//             //         potentialPasses.add(test);
//             //         test = test.substring(
//             //             leftIndex.length,
//             //             test.length - right.length
//             //         );
//             //     } else {
//             //         if (!levelDown) {
//             //             levelDown = true;
//             //         } else {
//             //             return total;
//             //         }
//             //     }
//             // }
//             // passingStrings = new Set([...passingStrings, ...potentialPasses])
//             // total++;
//             // break;
//         }
//     }
//     return total;
// }, 0);

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
                    if (key === 8) {
                        expression = [LEFT]
                    } else if (key === 11) {
                        expression = [OUT]
                    }
                    // expression = [SELF];
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
                            newChildKeyRule.push(
                                newChildRule[i] + expression[j]
                            );
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
//210 too low
// 431 too high


// TODO when expanding you have to expand on EVERY option of 42, not just what the current permutation is FUCK

// todo 42s >= 31s + 1