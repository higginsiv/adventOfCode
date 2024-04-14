const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2015', '16');

describe(`2015 Day 16`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(40);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(241);
    });
});
