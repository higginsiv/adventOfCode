import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2016', '23');

describe(`2016 Day 23`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(12516);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(479009076);
    });
});
