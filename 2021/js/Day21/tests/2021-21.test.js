const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2021', '21');

describe(`2021 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(920580);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(647920021341197);
    });
});