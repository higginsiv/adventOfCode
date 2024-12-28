import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';

const data = getInputForFunction('2024', '25');

describe(`2024 Day 25`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(2691);
    });
});
