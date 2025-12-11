import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2025', '11');

describe(`2025 Day 11`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(413);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(525518050323600);
    });
});