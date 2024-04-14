const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2015', '15');

describe(`2015 Day 15`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(13882464);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(11171160);
    });
});