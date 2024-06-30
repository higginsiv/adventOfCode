import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2022', '15');

describe(`2022 Day 15`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(5525990);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(11756174628223);
    });
});
