import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2021', '23');

describe(`2021 Day 23`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(14467);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(48759);
    });
});
