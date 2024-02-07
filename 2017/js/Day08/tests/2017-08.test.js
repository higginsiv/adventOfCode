const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2017', '08');

describe(`2017 Day 08`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(5849);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(6702);
    });
});
