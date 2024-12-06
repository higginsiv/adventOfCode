import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2020', '14');

describe(`2020 Day 14`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(5875750429995);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(5272149590143);
    });
});
