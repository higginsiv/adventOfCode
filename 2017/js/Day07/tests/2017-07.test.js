import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2017', '07');

describe(`2017 Day 07`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('rqwgj');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(333);
    });
});
