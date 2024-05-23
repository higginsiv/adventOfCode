const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2021', '13');

describe(`2021 Day 13`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(729);
    });

    test('Part 2', () => {
        // Spells RGZLBH
        const expected = '***   **  **** *    ***  *  * _*  * *  *    * *    *  * *  * _*  * *      *  *    ***  **** _***  * **  *   *    *  * *  * _* *  *  * *    *    *  * *  * _*  *  *** **** **** ***  *  * ';
        const actual = part2(data)
        .value[0].map((row) => row.join(''))
        .join('_');
        expect(actual).toBe(expected);
    });
});