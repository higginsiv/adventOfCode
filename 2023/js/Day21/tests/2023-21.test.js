const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2023', '21');

describe(`2023 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(3762);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(621944727930768);
    });
});