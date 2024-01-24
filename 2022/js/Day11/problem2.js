const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '11', '2'];
const data = fr.getInput(year, day);

const rounds = 10000;
let divisors = [];

function getLcm(a, b) {
    return (a * b) / gcd(a, b);
}

function gcd(a, b) {
    return b == 0 ? a : gcd(b, a % b);
}

class Monkey {
    items;
    operation;
    test;
    passDest;
    failDest;
    inspections = 0;
    constructor() {}
}

let monkeys = [];

data.forEach((x, index) => {
    switch (index % 7) {
        case 0:
            monkeys.push(new Monkey());
            break;
        case 1:
            x = x.replace('  Starting items: ', '');
            monkeys[monkeys.length - 1].items = x.split(',').map((y) => parseInt(y));
            break;
        case 2:
            x = x.replace('  Operation: new = ', '');
            monkeys[monkeys.length - 1].operation = new Function('old', 'return ' + x);
            break;
        case 3:
            x = x.replace('  Test: divisible by ', '');
            monkeys[monkeys.length - 1].test = new Function('old', 'return old % ' + x + ' === 0');
            divisors.push(parseInt(x));
            break;
        case 4:
            x = x.replace('    If true: throw to monkey ', '');
            monkeys[monkeys.length - 1].passDest = parseInt(x);
            break;
        case 5:
            x = x.replace('    If false: throw to monkey ', '');
            monkeys[monkeys.length - 1].failDest = parseInt(x);
            break;
    }
});

let lcm = divisors.reduce((acc, curr) => {
    return getLcm(acc, curr);
}, 1);

for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
        let monkey = monkeys[j];
        while (monkey.items.length > 0) {
            let item = monkey.items.shift();
            item = monkey.operation(item);
            item = item % lcm;

            monkey.inspections++;

            let monkeyToPass = monkey.test(item) ? monkey.passDest : monkey.failDest;

            monkeys[monkeyToPass].items.push(item);
        }
    }
}

monkeys.sort((a, b) => {
    return b.inspections - a.inspections;
});

const monkeyBusiness = monkeys[0].inspections * monkeys[1].inspections;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + monkeyBusiness);
