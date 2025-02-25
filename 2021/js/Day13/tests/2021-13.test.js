import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

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
