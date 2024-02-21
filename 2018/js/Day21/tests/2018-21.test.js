const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2018', '21');

describe(`2018 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(9079325);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(3715167);
    });
});
