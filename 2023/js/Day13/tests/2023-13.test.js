import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2023', '13');

describe(`2023 Day 13`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(34202);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(34230);
    });
});
