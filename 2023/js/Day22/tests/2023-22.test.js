import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2023', '22');

describe(`2023 Day 22`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(480);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(84021);
    });
});
