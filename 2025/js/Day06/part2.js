import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const ROWS = lines.length;
    lines = lines.map((line, index) => {
        return line.split('');
    });
    let answer = 0;

    let numbers = [];
    let operator;
    let allEmpty = false;
    for (let i = lines[0].length; i >= 0; i--) {
        allEmpty = true;
        let currentNumber = [];
        for (let j = 0; j < ROWS; j++) {
            if (lines[j][i] !== ' ' && lines[j][i] !== undefined) {
                allEmpty = false;
                if (lines[j][i] === '+' || lines[j][i] === '*') {
                    operator = lines[j][i];
                } else {
                    currentNumber.push(lines[j][i]);
                }
            }
        }

        if (currentNumber.length > 0) {
            numbers.push(parseInt(currentNumber.join('')));
        }

        if (allEmpty) {
            answer += calculate(numbers, operator);
            numbers = [];
            operator = undefined;
        }
    }

    if (numbers.length > 0) {
        answer += calculate(numbers, operator);
    }

    function calculate(numbers, operator) {
        if (operator === '+') {
            return sum(numbers);
        } else if (operator === '*') {
            return multiply(numbers);
        }
        return 0;
    }

    function multiply(arr) {
        return arr.reduce((a, b) => a * b, 1);
    }

    function sum(arr) {
        return arr.reduce((a, b) => a + b, 0);
    }
    return new Solution(answer);
}
