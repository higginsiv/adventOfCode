const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2017', '21');

describe(`2017 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(164);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(2355110);
    });
});
