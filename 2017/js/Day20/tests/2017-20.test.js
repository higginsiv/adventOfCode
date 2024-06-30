import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2017', '20');

describe(`2017 Day 20`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(376);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(574);
    });
});
