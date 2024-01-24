const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);
const { solve: part2 } = require(`../problem2.js`);

const data = fr.getInputForFunction('2016', '11');

describe(`2016 Day 11`, () => {
  it('Part 1 - Example 1', () => {
    const lines = [
      'The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.',
      'The second floor contains a hydrogen generator',
      'The third floor contains a lithium generator',
      'The fourth floor contains nothing relevant.',
    ];
    expect(part1({ lines }).value).toBe(11);
  });

  it('Part 1', () => {
    expect(part1(data).value).toBe(47);
  });

  it('Part 2', () => {
    expect(part2(data).value).toBe(71);
  });
});
