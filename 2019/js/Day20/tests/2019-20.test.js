import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2019', '20');

describe(`2019 Day 20`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(620);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(7366);
    });
});
