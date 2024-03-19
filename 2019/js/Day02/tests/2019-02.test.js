const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2019', '02');

describe(`2019 Day 02`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(3850704);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(6718);
    });
});