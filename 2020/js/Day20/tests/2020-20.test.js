import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2020', '20');

describe(`2020 Day 20`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(15405893262491);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(2133);
    });
});
