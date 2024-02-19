const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2018', '20');

describe(`2018 Day 20`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(3512);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(8660);
    });
});