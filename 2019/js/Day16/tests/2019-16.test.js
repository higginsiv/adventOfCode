const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2019', '16');

describe(`2019 Day 16`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(23135243);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(21130597);
    });
});