import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2016', '10');

describe(`2016 Day 10`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(27);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(13727);
    });
});
