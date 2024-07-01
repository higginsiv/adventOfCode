export default function solve({ lines, rawData }) {
    let state = lines[0].charAt(lines[0].length - 2);
    const steps = Number(lines[1].match(/\d+/)[0]);

    const rules = {};

    for (let i = 3; i < lines.length; i += 10) {
        let rule = {};
        let state = lines[i].charAt(lines[i].length - 2);
        let rule0 = {
            value: Number(lines[i + 2].match(/\d+/)[0]),
            move: lines[i + 3].includes('right') ? 1 : -1,
            next: lines[i + 4].charAt(lines[i + 4].length - 2),
        };
        let rule1 = {
            value: Number(lines[i + 6].match(/\d+/)[0]),
            move: lines[i + 7].includes('right') ? 1 : -1,
            next: lines[i + 8].charAt(lines[i + 8].length - 2),
        };
        rule[0] = rule0;
        rule[1] = rule1;
        rules[state] = rule;
    }

    let tape = new Map();
    tape.set(0, 0);
    let position = 0;

    for (let i = 0; i < steps; i++) {
        let value = tape.get(position) || 0;
        let rule = rules[state][value];
        tape.set(position, rule.value);
        position += rule.move;
        state = rule.next;
    }

    const answer = [...tape.values()].filter((v) => v === 1).length;
    return { value: answer };
}
