import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2022', '18');

describe(`2022 Day 18`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(4504);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(2556);
    });
});
