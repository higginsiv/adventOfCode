console.time();
const fr = require('../../../tools/fileReader');
const {EOL} = require('os');
const [year, day, part] = ["2020","19","1"];
const data = fr.getInput(year,day, EOL+EOL);

class Rule {
    key;
    validStrings;
    children;
    constructor(key, children) {
        this.key = key;
        this.children = children;
    }
}

let keysToRules = new Map();
data[0].split(EOL).forEach(line => {
    line = line.split(': ');
    key = parseInt(line[0]);
    values = line[1].split(' | ').map(opt => {
        opt = opt.split(' ').map(r => {
            if (r.indexOf('"') !== -1) {
                r = r.replaceAll('"','');
                return r;
            }
            return parseInt(r)
        });
        return opt;
    });
    keysToRules.set(key, new Rule(key, values));
})

buildRule(0);

let answer = data[1].split(EOL).reduce((total, curr) => {
    if (keysToRules.get(0).validStrings.includes(curr)) {
        total++;
    }
    return total;
}, 0);

function buildRule(key) {
    let rule = keysToRules.get(key);
    let validStrings = [];
    if (rule.validStrings != null) {
        return rule.validStrings;
    } else {
        rule.children.forEach(child => {
            let newChildRule = [];
            child.forEach(childKey => {
                let newChildKeyRule = []
                let expression;
                if (isNaN(childKey)) {
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
            })
            newChildRule.forEach(x => validStrings.push(x));
        })
        rule.validStrings = validStrings;
        return rule.validStrings;
    }
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();