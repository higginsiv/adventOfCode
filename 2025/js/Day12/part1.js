import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    let data = rawData.split(EOL + EOL);

    let goals = data.pop();
    goals = goals.split(EOL).map((line) => {
        const [dimension, values] = line.split(': ');
        const [row, col] = dimension.split('x').map(Number);
        return { row, col, values: values.split(' ').map(Number) };
    });

    const presents = data.map((x) => {
        x = x.split(EOL);
        x.shift();
        let grid = x.map((line) => line.split('').map((char) => (char === '#' ? 1 : 0)));
        return grid.flat().reduce((sum, val) => sum + val, 0);
    });

    const answer = goals.reduce((total, goal) => {
        const size = goal.row * goal.col;
        const canFit =
            goal.values.reduce((sum, val, index) => {
                return sum + presents[index] * val;
            }, 0) <= size;
        return total + (canFit ? 1 : 0);
    }, 0);

    return new Solution(answer);
}
