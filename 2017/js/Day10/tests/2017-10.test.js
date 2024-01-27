const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2017', '10');

describe(`2017 Day 10`, () => {
    it('Part 1', () => {
        expect(part1(data).value).toBe(4480);
    });

    it('Part 2', () => {
        expect(part2(data).value).toBe('c500ffe015c83b60fad2e4b7d59dabc4');
    });
});