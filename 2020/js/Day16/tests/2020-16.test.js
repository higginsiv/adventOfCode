const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2020', '16');

describe(`2020 Day 16`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(23009);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(10458887314153);
    });
});