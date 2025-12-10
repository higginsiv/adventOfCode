import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    lines = lines.map((line) => {
        let strings = line.split(']');
        const indicators = strings[0]
            .slice(1)
            .split('')
            .map((char) => {
                return char === '.' ? 0 : 1;
            });

        strings = strings[1].split(' {');
        const joltages = strings[1]
            .slice(0, -1)
            .split(',')
            .map((num) => Number(num));

        const buttons = strings[0]
            .trim()
            .split(' ')
            .map((nums) => {
                nums = nums.slice(1, -1);
                return nums.split(',').map((num) => Number(num));
            });
        return { indicators, buttons, joltages };
    });

    const answer = lines.reduce((sum, curr) => {
        const { indicators, buttons } = curr;
        const stateToSteps = new Map();
        const queue = [];
        const goalState = indicators.join('');
        const initialState = '0'.repeat(indicators.length);

        stateToSteps.set(initialState, 0);
        queue.push({ state: initialState, steps: 0 });

        while (queue.length > 0) {
            const { state, steps } = queue.shift();

            if (state === goalState) {
                return sum + steps;
            }

            for (let i = 0; i < buttons.length; i++) {
                const newState = [...state];
                for (const buttonIndex of buttons[i]) {
                    newState[buttonIndex] = newState[buttonIndex] === '0' ? '1' : '0';
                }
                const newStateKey = newState.join('');
                const bestSteps = stateToSteps.get(newStateKey) || 0;
                if (bestSteps === 0 || bestSteps > steps + 1) {
                    stateToSteps.set(newStateKey, steps + 1);
                    queue.push({ state: newStateKey, steps: steps + 1 });
                }
            }
        }
    }, 0);
    return new Solution(answer);
}
