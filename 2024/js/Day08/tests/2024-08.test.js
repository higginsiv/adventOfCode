import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2024', '08');

describe(`2024 Day 08`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(361);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1249);
    });
});