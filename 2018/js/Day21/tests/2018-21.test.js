import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2018', '21');

describe(`2018 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(9079325);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(3715167);
    });
});
