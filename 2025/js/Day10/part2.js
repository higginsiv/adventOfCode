import { Solution } from '#tools/solution.js';
import { init } from 'z3-solver';

export default async function solve({ lines, rawData }) {
    const { Context, em } = await init();
    const { Optimize, Int, Sum } = new Context('main');

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

    let answer = 0;

    for (const curr of lines) {
        let { buttons, joltages } = curr;

        joltages = joltages.map((joltage, index) => {
            const buttonsThatAffectThisJoltage = Array(buttons.length).fill(0);
            for (let i = 0; i < buttons.length; i++) {
                for (const buttonIndex of buttons[i]) {
                    if (buttonIndex === index) {
                        buttonsThatAffectThisJoltage[i] = 1;
                    }
                }
            }
            return {
                joltage,
                buttonsThatAffectThisJoltage,
            };
        });


        const solver = new Optimize();
        const variables = buttons.map((_, index) => Int.const(`b${index}`));
        joltages.forEach(({ joltage, buttonsThatAffectThisJoltage }, index) => {
            const expr = variables.reduce((acc, variable, varIndex) => {
                if (buttonsThatAffectThisJoltage[varIndex] === 1) {
                    return acc.add(variable);
                }
                return acc;
            }, Int.val(0));
            solver.add(expr.eq(Int.val(joltage)));
        });

        for (const variable of variables) {
            solver.add(variable.ge(Int.val(0)));
        }

        solver.minimize(Sum(...variables));
        const result = await solver.check();

        if (result !== 'sat') {
            throw new Error('Unsatisfiable');
        }

        
        const model = solver.model();
        let totalPresses = 0;
        variables.forEach((variable) => {
            totalPresses += Number(model.eval(variable).value());
        });

        answer += totalPresses;
    }

    em.PThread.terminateAllThreads();

    return new Solution(answer);
}
