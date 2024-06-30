import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2018', '22');

describe(`2018 Day 22`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(11810);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1015);
    });
});
