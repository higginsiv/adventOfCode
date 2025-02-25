import { getInputForFunction } from '#tools/fileReader.js';
import { default as part1 } from '../part1.js';
import { default as part2 } from '../part2.js';

const data = getInputForFunction('2019', '08');

describe(`2019 Day 08`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(2286);
    });

    test('Part 2', () => {
        // Spells CJZLP
        const expected =
            '0110000110111101000011100_1001000010000101000010010_1000000010001001000010010_1000000010010001000011100_1001010010100001000010000_0110001100111101111010000';
        const actual = part2(data)
            .value.map((row) => row.join(''))
            .join('_');
        expect(actual).toBe(expected);
    });
});
