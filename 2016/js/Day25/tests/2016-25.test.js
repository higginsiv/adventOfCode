const fr = require('../../../../tools/fileReader');
const { solve: part1 } = require(`../problem1.js`);

const data = fr.getInputForFunction('2016', '25');

describe(`2016 Day 25`, () => {
  it('Part 1', () => {
    expect(part1(data).value).toBe(198);
  });
});
