import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2019', '21');

describe(`2019 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(19352864);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(1142488337);
    });
});
