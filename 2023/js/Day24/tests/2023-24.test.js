import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2023', '24');

describe(`2023 Day 24`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(17906);
    });

    test('Part 2', async () => {
        const result = await part2(data);
        expect(result.value).toBe(571093786416929);
    });
});
