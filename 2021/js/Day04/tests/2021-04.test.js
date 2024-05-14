const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);


describe(`2021 Day 04`, () => {
    test('Part 1', () => {
        const data = fr.getInputForFunction('2021', '04');
        expect(part1(data).value).toBe(33348);
    });

    test('Part 2', () => {
        const data = fr.getInputForFunction('2021', '04');
        expect(part2(data).value).toBe(8112);
    });
});