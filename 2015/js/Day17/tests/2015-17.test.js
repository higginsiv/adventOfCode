const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2015', '17');

describe(`2015 Day 17`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(654);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(57);
    });
});