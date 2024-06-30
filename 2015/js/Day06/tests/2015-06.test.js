import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2015', '06');

describe(`2015 Day 06`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(400410);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(15343601);
    });
});
