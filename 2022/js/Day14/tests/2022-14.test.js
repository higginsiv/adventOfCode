const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2022', '14');

describe(`2022 Day 14`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(728);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(27623);
    });
});