import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2015', '01');

describe(`2015 Day 01`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(280);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1797);
    });
});
