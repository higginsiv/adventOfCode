const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2023', '19');

describe(`2023 Day 19`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(420739);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(130251901420382);
    });
});