const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '21', '2'];
const HUMAN = 'humn';
const ROOT = 'root';
const NUMBER = 'number';
const BIGINT = 'bigint';
const [ADD, SUB, MULT, DIV] = ['+', '-', '*', '/'];
const [OP_BEFORE_VAL, OP_AFTER_VAL] = [0, 1];

class Command {
    key;
    param1;
    param2;
    operator;
    isNum;

    constructor(key, param1, param2, operator) {
        this.key = key;
        this.param1 = param1;
        this.param2 = param2;
        this.operator = operator;
        this.isNum = param2 == null;
    }
}
const data = fr.getInput(year, day).map((y) => {
    let parts = y.split(': ');
    let cmd = parts[1].split(' ');

    if (cmd.length === 1) {
        y = new Command(parts[0], parseInt(parts[1]));
    } else {
        let operator = parts[0] === ROOT ? '===' : cmd[1];
        y = new Command(parts[0], cmd[0], cmd[2], operator);
    }
    return y;
});

let commands = new Map();
data.forEach((x) => {
    commands.set(x.key, x);
});

// "new Function" syntax results in functions that only have access to global scope
global.calc = function calc(key) {
    let cmd = commands.get(key);
    let closeEnough;
    if (key === ROOT) {
        const val1 = calc(cmd.param1);
        const val2 = calc(cmd.param2);

        if (typeof val1 !== NUMBER) {
            return operate(val1, val2);
        } else if (typeof val2 !== NUMBER) {
            return operate(val2, val1);
        }
    } else {
        if (!cmd.isNum) {
            const val1 = calc(cmd.param1);
            const val2 = calc(cmd.param2);

            if (
                (typeof val1 === NUMBER || typeof val1 === BIGINT) &&
                (typeof val2 === NUMBER || typeof val2 === BIGINT)
            ) {
                let [numer, denom] = dealWithFloats(
                    BigInt(val1),
                    BigInt(1),
                    cmd.operator,
                    BigInt(val2),
                    OP_BEFORE_VAL,
                );
                return numer / denom;
            } else {
                // building out expression
                return '(' + val1 + ' ' + cmd.operator + ' ' + val2 + ')';
            }
        } else {
            if (cmd.key === HUMAN) {
                return HUMAN;
            }

            return BigInt(cmd.param1);
        }
    }
};

function operate(equation, goalNumber) {
    let numer = BigInt(goalNumber);
    let denom = BigInt(1);
    while (true) {
        equation = equation.substring(1, equation.length - 1);

        let num;
        let operator;
        if (!equation.startsWith('(') && !equation.startsWith(HUMAN)) {
            let locOfFirstSpace = equation.indexOf(' ');
            let locOfSecondSpace = equation.indexOf(' ', locOfFirstSpace + 1);
            num = parseInt(equation.substring(0, locOfFirstSpace));
            operator = getOppositeOperator(
                equation.substring(locOfFirstSpace + 1, locOfSecondSpace),
            );
            equation = equation.substring(locOfSecondSpace + 1);

            [numer, denom] = dealWithFloats(numer, denom, operator, num, OP_AFTER_VAL);
        } else if (equation.startsWith('(') && !equation.endsWith(HUMAN)) {
            let locOfFirstSpace = equation.lastIndexOf(' ');
            let locOfSecondSpace = equation.lastIndexOf(' ', locOfFirstSpace - 1);
            num = parseInt(equation.substring(locOfFirstSpace));
            operator = getOppositeOperator(
                equation.substring(locOfSecondSpace + 1, locOfFirstSpace),
            );
            equation = equation.substring(0, locOfSecondSpace);

            [numer, denom] = dealWithFloats(numer, denom, operator, num, OP_BEFORE_VAL);
        } else if (equation.startsWith(HUMAN)) {
            let locOfFirstSpace = equation.indexOf(' ');
            let locOfSecondSpace = equation.indexOf(' ', locOfFirstSpace + 1);
            num = parseInt(equation.substring(locOfSecondSpace));
            operator = getOppositeOperator(
                equation.substring(locOfFirstSpace + 1, locOfSecondSpace),
            );

            [numer, denom] = dealWithFloats(numer, denom, operator, num, OP_BEFORE_VAL);
            break;
        } else if (equation.endsWith(HUMAN)) {
            let locOfFirstSpace = equation.indexOf(' ');
            let locOfSecondSpace = equation.indexOf(' ', locOfFirstSpace + 1);
            num = parseInt(equation.substring(0, locOfFirstSpace));
            operator = getOppositeOperator(
                equation.substring(locOfFirstSpace + 1, locOfSecondSpace),
            );
            [numer, denom] = dealWithFloats(numer, denom, operator, num, OP_AFTER_VAL);
            break;
        }
    }

    return numer / denom;
}

function getOppositeOperator(operator) {
    switch (operator) {
        case ADD:
            return SUB;
        case SUB:
            return ADD;
        case MULT:
            return DIV;
        case DIV:
            return MULT;
    }
}

/**
 *
 * If invoking this from the "operate" method, an "operator" of ADD indicates that you
 * are undoing a SUB action. As an example, imagine you were solving "x = 9 - y" for y.
 * In this case you are undoing a SUB action with the "operator" AFTER the "val" This
 * would solve to the expression "y = 9 - x".
 */
function dealWithFloats(numer, denom, operator, val, opOrder) {
    val = BigInt(val);
    switch (operator) {
        case ADD:
            if (opOrder === OP_BEFORE_VAL) {
                numer = numer + val * denom;
            } else {
                numer = val * denom - numer;
            }
            break;
        case SUB:
            numer = numer - val * denom;
            break;
        case MULT:
            if (opOrder === OP_BEFORE_VAL) {
                numer = numer * val;
            } else {
                let temp = numer;
                numer = denom * val;
                denom = temp;
            }
            break;
        case DIV:
            denom = denom * val;
            break;
    }

    let greatest = BigInt(gcd(numer, denom));
    numer = numer / greatest;
    denom = denom / greatest;

    return [numer, denom];
}

function gcd(a, b) {
    return b == 0 ? a : gcd(b, a % b);
}

let answer = calc(ROOT);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
