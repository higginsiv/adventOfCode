import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    const ROWS = lines.length;
    lines = lines.map((line, index) => {
        if (index >= ROWS - 1) {
            return line.trim().split(/\s+/);
        }
        return line.trim().split(/\s+/).map(Number);
    });
    let answer = 0;

    for (let i = 0; i < lines[0].length; i++) {
        let localAnswer = 0;
        let numbers = [];
        for (let j = 0; j < ROWS - 1; j++) {
            numbers.push(lines[j][i]);
        }
        if (lines[ROWS - 1][i] === '+') {
            localAnswer = sum(numbers);
        } else if (lines[ROWS - 1][i] === '*') {
            localAnswer = multiply(numbers);
        } else {
            console.log('oops', lines[ROWS - 1][i]);
        }
        answer += localAnswer;
    }

    function multiply(arr) {
        return arr.reduce((a, b) => a * b, 1);
    }

    function sum(arr) {
        return arr.reduce((a, b) => a + b, 0);
    }
    return new Solution(answer);
}
