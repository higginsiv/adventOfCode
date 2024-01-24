const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2016', '23');

describe(`2016 Day 23`, () => {
    it('Part 1', () => {
        expect(part1(data).value).toBe(12516);
    });

    it('Part 2', () => {
        expect(part2(data).value).toBe(479009076);
    });
});
