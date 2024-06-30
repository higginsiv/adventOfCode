import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2019', '15');

describe(`2019 Day 15`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(210);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(290);
    });
});
