import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2019', '01');

describe(`2019 Day 01`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(3474920);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(5209504);
    });
});
