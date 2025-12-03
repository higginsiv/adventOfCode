import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2025', '03');

describe(`2025 Day 03`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(17301);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(172162399742349);
    });
});