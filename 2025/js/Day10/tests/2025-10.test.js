import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2025', '10');

describe(`2025 Day 10`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(532);
    });

    test('Part 2', async () => {
        const result = await part2(data);
        expect(result.value).toBe(18387);
    }, 15000);
});