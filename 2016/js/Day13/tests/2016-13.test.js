import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2016', '13');

describe(`2016 Day 13`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(86);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(127);
    });
});
