export default function solve({ lines, rawData }) {
    const [PLUS, MULT] = ['+', '*'];
    const PLACEHOLDER = 'P';
    const data = lines.map((line) => {
        line = line.replaceAll('(', '( ');
        line = line.replaceAll(')', ' )');
        return line.split(' ');
    });

    let sum = 0;
    data.forEach((exp) => {
        let total = [PLACEHOLDER];
        let operators = [];

        while (exp.length > 0) {
            let symbol = exp.shift();
            switch (symbol) {
                case '(':
                    total.push(PLACEHOLDER);
                    break;
                case ')':
                    let subTotal = total.pop();
                    if (total[total.length - 1] === PLACEHOLDER) {
                        total[total.length - 1] = subTotal;
                    } else {
                        total[total.length - 1] = operate(
                            total[total.length - 1],
                            subTotal,
                            operators.pop(),
                        );
                    }
                    break;
                case PLUS:
                    operators.push(symbol);
                    break;
                case MULT:
                    operators.push(symbol);
                    break;
                default:
                    if (total[total.length - 1] === PLACEHOLDER) {
                        total[total.length - 1] = parseInt(symbol);
                    } else {
                        total[total.length - 1] = operate(
                            total[total.length - 1],
                            parseInt(symbol),
                            operators.pop(),
                        );
                    }
                    break;
            }
        }

        sum += total[0];
    });

    function operate(x, y, operator) {
        switch (operator) {
            case PLUS:
                return add(x, y);
            case MULT:
                return mult(x, y);
        }
    }

    function add(x, y) {
        return x + y;
    }

    function mult(x, y) {
        return x * y;
    }
    return { value: sum };
}
