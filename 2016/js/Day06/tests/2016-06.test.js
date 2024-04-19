const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2016', '06');

describe(`2016 Day 06`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('mshjnduc');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('apfeeebz');
    });
});