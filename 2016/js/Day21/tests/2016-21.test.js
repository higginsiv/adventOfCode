const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2016', '21');

describe(`2016 Day 21`, () => {
    it('Part 1', () => {
        expect(part1(data).value).toBe('dbfgaehc');
    });

    it('Part 2', () => {
        expect(part2(data).value).toBe('aghfcdeb');
    });
});
