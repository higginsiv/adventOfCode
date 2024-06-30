import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2022', '18');

describe(`2022 Day 18`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(4504);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(2556);
    });
});
