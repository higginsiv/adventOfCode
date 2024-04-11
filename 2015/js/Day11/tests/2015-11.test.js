const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2015', '11');

describe(`2015 Day 11`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('hxbxxyzz');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('hxcaabcc');
    });
});