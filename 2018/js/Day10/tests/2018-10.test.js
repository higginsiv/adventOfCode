const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2018', '10');

describe(`2018 Day 10`, () => {
    test('Part 1', () => {
        // Spells JJXZHKFP
        const expected =
            '...###.....###..#....#..######..#....#..#....#..######..#####._....#.......#...#....#.......#..#....#..#...#...#.......#....#_....#.......#....#..#........#..#....#..#..#....#.......#....#_....#.......#....#..#.......#...#....#..#.#.....#.......#....#_....#.......#.....##.......#....######..##......#####...#####._....#.......#.....##......#.....#....#..##......#.......#....._....#.......#....#..#....#......#....#..#.#.....#.......#....._#...#...#...#....#..#...#.......#....#..#..#....#.......#....._#...#...#...#...#....#..#.......#....#..#...#...#.......#....._.###.....###....#....#..######..#....#..#....#..#.......#.....';
        const actual = part1(data)
            .value.map((row) => row.join(''))
            .join('_');
        expect(actual).toBe(expected);
    });

    test('Part 2', () => {
        expect(part2(data).value).toBe(10036);
    });
});
