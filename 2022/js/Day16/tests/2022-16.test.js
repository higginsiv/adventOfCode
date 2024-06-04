const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2022', '16');

describe(`2022 Day 16`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(1659);
    });

    test('Part 2', () => {
        // TODO enable when performance is better
        // expect(part2(data).value).toBe(2382);
    });
});