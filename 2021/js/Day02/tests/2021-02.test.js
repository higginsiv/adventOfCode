import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2021', '02');

describe(`2021 Day 02`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(1714950);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1281977850);
    });
});
