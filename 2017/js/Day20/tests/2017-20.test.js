const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2017', '20');

describe(`2017 Day 20`, () => {
    it('Part 1', () => {
        expect(part1(data).value).toBe(376);
    });

    it('Part 2', () => {
        expect(part2(data).value).toBe(574);
    });
});