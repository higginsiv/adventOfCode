import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    let [rules, updates] = rawData.split(EOL + EOL);
    let ruleToLaterRules = new Map();

    rules = rules.split(EOL).map((rule) => {
        rule = rule.split('|').map(Number);
        return rule;
    });

    rules.forEach((rule) => {
        const [before, after] = rule;
        const laterRules = ruleToLaterRules.get(before) ?? [];
        laterRules.push(after);
        ruleToLaterRules.set(before, laterRules);
    });

    updates = updates.split(EOL).map((update) => update.split(',').map(Number));

    const answer = updates.reduce((acc, update) => {
        if (updateInOrder(update)) {
            return acc + update[Math.floor(update.length / 2)];
        }
        return acc;
    }, 0);

    return new Solution(answer);

    function updateInOrder(update) {
        for (let i = 0; i < update.length; i++) {
            for (let j = 0; j < i; j++) {
                if (ruleToLaterRules.get(update[i])?.includes(update[j])) {
                    return false;
                }
            }
        }
        return true;
    }
}
