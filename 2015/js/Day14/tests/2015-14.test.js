const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2015', '14');

describe(`2015 Day 14`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe();
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe();
    });
});