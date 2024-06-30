import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

describe(`2021 Day 04`, () => {
    test('Part 1', () => {
        const data = getInputForFunction('2021', '04');
        expect(part1(data).value).toBe(33348);
    });

    test('Part 2', () => {
        const data = getInputForFunction('2021', '04');
        expect(part2(data).value).toBe(8112);
    });
});
