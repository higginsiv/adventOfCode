import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2019', '07');

describe(`2019 Day 07`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(437860);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(49810599);
    });
});
