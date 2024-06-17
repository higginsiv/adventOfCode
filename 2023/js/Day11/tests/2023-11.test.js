const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2023', '11');

describe(`2023 Day 11`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(9509330);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(635832237682);
    });
});