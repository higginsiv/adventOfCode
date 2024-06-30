import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2019', '14');

describe(`2019 Day 14`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(261960);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(4366186);
    });
});
