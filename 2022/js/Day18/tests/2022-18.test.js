const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2022', '18');

describe(`2022 Day 18`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(4504);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(2556);
    });
});