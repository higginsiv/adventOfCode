const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2019', '23');

describe(`2019 Day 23`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(14834);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(10215);
    });
});