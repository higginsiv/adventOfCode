const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2021', '08');

describe(`2021 Day 08`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(344);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1048410);
    });
});