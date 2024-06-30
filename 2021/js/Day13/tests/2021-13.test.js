import { getInputForFunction } from '../../../../tools/fileReader.js';
import { solve as part1 } from '../problem1.js';
import { solve as part2 } from '../problem2.js';

const data = getInputForFunction('2021', '13');

describe(`2021 Day 13`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(729);
    });

    test('Part 2', () => {
        // Spells RGZLBH
        const expected =
            '***   **  **** *    ***  *  * _*  * *  *    * *    *  * *  * _*  * *      *  *    ***  **** _***  * **  *   *    *  * *  * _* *  *  * *    *    *  * *  * _*  *  *** **** **** ***  *  * ';
        const actual = part2(data)
            .value.map((row) => row.join(''))
            .join('_');
        expect(actual).toBe(expected);
    });
});
