import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2023', '11');

describe(`2023 Day 11`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(9509330);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(635832237682);
    });
});
