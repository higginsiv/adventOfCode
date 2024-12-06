import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2016', '02');

describe(`2016 Day 02`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('56983');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('8B8B1');
    });
});
