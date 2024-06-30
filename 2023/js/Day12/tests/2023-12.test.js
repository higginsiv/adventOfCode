import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2023', '12');

describe(`2023 Day 12`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(7173);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(29826669191291);
    });
});
