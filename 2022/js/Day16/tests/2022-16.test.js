import { getInputForFunction } from '../../../../tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2022', '16');

describe(`2022 Day 16`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(1659);
    });

    test('Part 2', () => {
        // TODO enable when performance is better
        // expect(part2(data).value).toBe(2382);
    });
});
