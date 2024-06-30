import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2016', '21');

describe(`2016 Day 21`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe('dbfgaehc');
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe('aghfcdeb');
    });
});
