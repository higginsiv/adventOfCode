import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2016', '12');

describe(`2016 Day 12`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(317993);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(9227647);
    });
});
