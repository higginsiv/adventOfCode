import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2019', '16');

describe(`2019 Day 16`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('23135243');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('21130597');
    });
});
