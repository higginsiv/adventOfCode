const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2016', '14');

describe(`2016 Day 14`, () => {
    it('Part 1 - Example', () => {
        expect(part1({rawData: 'abc'}).value).toBe(22728);
    });

    it('Part 1', () => {
        expect(part1(data).value).toBe(25427);
    });

    it('Part 2 - Example', () => {
        expect(part2({rawData: 'abc'}).value).toBe();
    });
    
    it('Part 2', () => {
        expect(part2(data).value).toBe();
    });
});