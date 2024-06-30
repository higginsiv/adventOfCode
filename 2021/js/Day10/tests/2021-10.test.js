import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2021', '10');

describe(`2021 Day 10`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(392367);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(2192104158);
    });
});
