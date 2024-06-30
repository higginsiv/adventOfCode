const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2022', '10');

describe(`2022 Day 10`, () => {
    test('Part 1', () => {
        expect(part1(data).value).toBe(14920);
    });

    test('Part 2', () => {
        // Spells BUCACBUZ (but oddly with the bottom row missing)
        const rawAnswer = part2(data).value;
        let actual = '';
        rawAnswer.forEach((m) => {
            m.forEach((c) => {
                actual += c;
            });
            actual += '_';
        });

        expect(actual).toBe('_###..#..#..##...##...##..###..#..#.####._#..#.#..#.#..#.#..#.#..#.#..#.#..#....#._###..#..#.#....#..#.#....###..#..#...#.._#..#.#..#.#....####.#....#..#.#..#..#..._#..#.#..#.#..#.#..#.#..#.#..#.#..#.#...._');
    });
});