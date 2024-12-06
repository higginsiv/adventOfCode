import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2017', '24');

describe(`2017 Day 24`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(1859);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1799);
    });
});
