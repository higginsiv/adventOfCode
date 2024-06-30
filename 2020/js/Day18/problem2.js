export default function solve({ lines, rawData }) {
    const [PLUS, MULT] = ['+', '*'];
    const data = lines.map((line) => {
        line = line.replaceAll('(', '( ');
        line = line.replaceAll(')', ' )');
        return line.split(' ');
    });

    const OPERATORS = [PLUS, MULT];

    let sum = 0;
    data.forEach((exp, index) => {
        let operatorStack = [];
        let outputQueue = [];
        while (exp.length > 0) {
            let incoming = exp.shift();
            if (OPERATORS.includes(incoming)) {
                if (operatorStack.length === 0) {
                    operatorStack.push(incoming);
                } else {
                    while (operatorStack.length > 0) {
                        let top = operatorStack[operatorStack.length - 1];
                        if (top === '(') {
                            operatorStack.push(incoming);
                            break;
                        } else if (OPERATORS.indexOf(incoming) < OPERATORS.indexOf(top)) {
                            operatorStack.push(incoming);
                            break;
                        } else if (OPERATORS.indexOf(incoming) === OPERATORS.indexOf(top)) {
                            outputQueue.push(operatorStack.pop());
                            operatorStack.push(incoming);
                            break;
                        } else {
                            outputQueue.push(operatorStack.pop());
                            if (operatorStack.length === 0) {
                                operatorStack.push(incoming);
                                break;
                            }
                        }
                    }
                }
            } else if (incoming === '(') {
                operatorStack.push(incoming);
            } else if (incoming === ')') {
                while (true) {
                    let el = operatorStack.pop();
                    if (el !== '(') {
                        outputQueue.push(el);
                    } else {
                        break;
                    }
                }
            } else {
                outputQueue.push(incoming);
            }
        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }
        let answerStack = [];

        while (outputQueue.length > 0) {
            let el = outputQueue.shift();
            if (OPERATORS.includes(el)) {
                let op1 = answerStack.pop();
                let op2 = answerStack.pop();
                let ans = new Function('return ' + op1 + el + op2)();
                answerStack.push(ans);
            } else {
                answerStack.push(el);
            }
        }
        sum += answerStack[0];
    });
    return { value: sum };
}
