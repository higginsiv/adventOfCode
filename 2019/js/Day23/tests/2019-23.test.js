import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2019', '23');

describe(`2019 Day 23`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(14834);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(10215);
    });
});
