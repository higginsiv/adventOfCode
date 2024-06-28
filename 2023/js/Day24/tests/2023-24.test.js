const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2023', '24');

describe(`2023 Day 24`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(17906);
    });

    test('Part 2', async () => {
        const result = await part2(data);
        expect(result.value).toBe(571093786416929);
    });
});