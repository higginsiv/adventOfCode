const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2020', '09');

describe(`2020 Day 09`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(133015568);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(16107959);
    });
});