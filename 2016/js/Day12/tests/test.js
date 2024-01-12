const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2016', '12');

describe(`2016 Day 12`, () => {
    it('Part 1', () => {
        expect(part1(data).value).toBe(317993);
    });

    it('Part 2', () => {
        expect(part2(data).value).toBe(9227647);
    });
});