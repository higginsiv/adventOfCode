import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../problem1.js';
import { default as part2 } from '../problem2.js';

const data = getInputForFunction('2019', '11');

describe(`2019 Day 11`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(2064);
    });

    test('Part 2', () => {
        // Spells LPZKLGHR
        const expected =
            '0,1,0,0,0,0,1,1,1,0,0,1,1,1,1,0,1,0,0,1,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,0,1,0,1,1,0,1,0,0,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,0,0';
        const actual = part2(data).value.join(',');
        expect(actual).toBe(expected);
    });
});
