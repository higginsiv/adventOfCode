import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2015', '14');

describe(`2015 Day 14`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(2655);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1059);
    });
});
