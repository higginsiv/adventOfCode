const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2020', '07');

describe(`2020 Day 07`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(211);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(12414);
    });
});