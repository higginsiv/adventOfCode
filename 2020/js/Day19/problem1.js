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

let rulesToValues = new Map();
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
    rulesToValues.set(key, new Rule(key, values));
})

console.log(rulesToValues.get(0));
console.log(rulesToValues.get(1));
console.log(rulesToValues.get(2));
console.log(rulesToValues.get(3));
console.log(rulesToValues.get(4));
console.log(rulesToValues.get(5));

buildRule(0);
console.log(rulesToValues.get(0))
print(0)
function buildRule(key) {
    let rule = rulesToValues.get(key);
    // console.log(rule);
    // console.log('***')
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
                    // console.log(expression)
                } else {
                    expression = buildRule(childKey);
                }
                if (newChildRule.length === 0) {
                    newChildRule = expression;
                } else {
                    // console.log('rule: ')
                    // console.log(rules);
                    // console.log('exp: ')

                    // console.log(expression);
                    // console.log('*********')
                    // console.log(key);
                    // console.log('*******')
                    for (let i = 0; i < newChildRule.length; i++) {
                        for (let j = 0; j < expression.length; j++) {
                            // console.log('*******')
                            // console.log(newChildRule[i]);
                            // console.log('**')
                            // console.log(expression[j])
                            // console.log('*******')
                            newChildKeyRule.push(newChildRule[i] + expression[j]);
                        }
                    }
                    newChildRule = newChildKeyRule;
                    
                }
                // rules.push(newChildRule);
            })
            newChildRule.forEach(x => validStrings.push(x));
            // validStrings.push(newChildRule);
        })
        rule.validStrings = validStrings;
        return rule.validStrings;
    }
}

function print(key) {
    let rule = rulesToValues.get(key);
    rule.validStrings.forEach(x => {
        console.log(x)
    })
}
let answer;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();