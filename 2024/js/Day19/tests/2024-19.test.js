import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2024', '19');

describe(`2024 Day 19`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(285);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(636483903099279);
    });
});