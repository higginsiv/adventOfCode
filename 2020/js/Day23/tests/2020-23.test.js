import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2020', '23');

describe(`2020 Day 23`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(69473825);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(96604396189);
    });
});
