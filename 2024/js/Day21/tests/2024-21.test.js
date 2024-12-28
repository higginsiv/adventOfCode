import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2024', '21');

describe(`2024 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(176650);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(217698355426872);
    });
});
