const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2017', '09');

describe(`2017 Day 09`, () => {
    it('Part 1', () => {
        expect(part1(data).value).toBe(12505);
    });

    it('Part 2', () => {
        expect(part2(data).value).toBe(6671);
    });
});