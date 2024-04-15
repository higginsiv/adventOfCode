const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2015', '19');

describe(`2015 Day 19`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(535);
    });

    test('Part 2', () => {
        // TODO add test back once solution is faster
        // expect(part2(data).value).toBe(212);
    });
});