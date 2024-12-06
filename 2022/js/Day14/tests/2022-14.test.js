import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2022', '14');

describe(`2022 Day 14`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(728);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(27623);
    });
});
