const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2023', '14');

describe(`2023 Day 14`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(103614);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(83790);
    });
});