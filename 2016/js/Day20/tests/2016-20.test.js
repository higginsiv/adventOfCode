const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2016', '20');

describe(`2016 Day 20`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(14975795);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(101);
    });
});
