import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2024', '17');

describe(`2024 Day 17`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('3,4,3,1,7,6,5,6,0');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(109019930331546);
    });
});
