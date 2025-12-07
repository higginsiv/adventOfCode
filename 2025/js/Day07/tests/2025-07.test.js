import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2025', '07');

describe(`2025 Day 07`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(1703);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(171692855075500);
    });
});