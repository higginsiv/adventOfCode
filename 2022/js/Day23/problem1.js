const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '23', '1'];
const ELF = '#';
const [NORTH, NORTHEAST, EAST, SOUTHEAST, SOUTH, SOUTHWEST, WEST, NORTHWEST] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
];
const DIRECTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const ROUNDS = 10;

let elves = [];
let propQueue = [NORTH, SOUTH, WEST, EAST];

class Elf {
  id;
  row;
  col;
  propRow;
  propCol;
  constructor(row, col, id) {
    this.row = row;
    this.col = col;
    this.id = id;
  }
}

function hasNeighbor(elf, dir, row, col) {
  switch (dir) {
    case NORTH:
      return elf.row === row - 1 && elf.col === col;
    case NORTHEAST:
      return elf.row === row - 1 && elf.col === col + 1;
    case EAST:
      return elf.col === col + 1 && elf.row === row;
    case SOUTHEAST:
      return elf.row === row + 1 && elf.col === col + 1;
    case SOUTH:
      return elf.row === row + 1 && elf.col === col;
    case SOUTHWEST:
      return elf.row === row + 1 && elf.col === col - 1;
    case WEST:
      return elf.col === col - 1 && elf.row === row;
    case NORTHWEST:
      return elf.row === row - 1 && elf.col === col - 1;
  }
}

let id = 0;
const data = fr.getInput(year, day).forEach((x, index) => {
  x = x.split('');

  x.forEach((y, ind) => {
    if (y === ELF) {
      elves.push(new Elf(index, ind, id++));
    }
  });
});

for (let round = 0; round < ROUNDS; round++) {
  for (let i = 0; i < elves.length; i++) {
    let neighbors = [];
    let currElf = elves[i];
    // This is a known inefficiency but I wanted to practice using the Array.some method
    DIRECTIONS.forEach((dir) => {
      if (
        elves.some((elf) => {
          return hasNeighbor(elf, dir, currElf.row, currElf.col);
        })
      ) {
        neighbors.push(dir);
      }
    });

    if (neighbors.length >= 1) {
      for (let i = 0; i < 4; i++) {
        let propDir = propQueue[i];
        if (propDir === NORTH) {
          if (
            !neighbors.includes(NORTH) &&
            !neighbors.includes(NORTHEAST) &&
            !neighbors.includes(NORTHWEST)
          ) {
            currElf.propRow = currElf.row - 1;
            currElf.propCol = currElf.col;
            break;
          }
        } else if (propDir === SOUTH) {
          if (
            !neighbors.includes(SOUTH) &&
            !neighbors.includes(SOUTHEAST) &&
            !neighbors.includes(SOUTHWEST)
          ) {
            currElf.propRow = currElf.row + 1;
            currElf.propCol = currElf.col;
            break;
          }
        } else if (propDir === WEST) {
          if (
            !neighbors.includes(WEST) &&
            !neighbors.includes(SOUTHWEST) &&
            !neighbors.includes(NORTHWEST)
          ) {
            currElf.propRow = currElf.row;
            currElf.propCol = currElf.col - 1;
            break;
          }
        } else if (propDir === EAST) {
          if (
            !neighbors.includes(EAST) &&
            !neighbors.includes(SOUTHEAST) &&
            !neighbors.includes(NORTHEAST)
          ) {
            currElf.propRow = currElf.row;
            currElf.propCol = currElf.col + 1;
            break;
          }
        }
      }
    }
  }

  for (let i = 0; i < elves.length; i++) {
    let currElf = elves[i];

    if (
      currElf.propCol != null &&
      !elves.some((elf) => {
        return (
          currElf.propRow === elf.propRow &&
          currElf.propCol === elf.propCol &&
          currElf.id !== elf.id
        );
      })
    ) {
      currElf.row = currElf.propRow;
      currElf.col = currElf.propCol;
    }
  }

  for (let i = 0; i < elves.length; i++) {
    let currElf = elves[i];

    currElf.propCol = null;
    currElf.propRow = null;
  }

  propQueue.push(propQueue.shift());
}

let minRow = Infinity;
let maxRow = -Infinity;
let minCol = Infinity;
let maxCol = -Infinity;

elves.forEach((elf) => {
  if (elf.row > maxRow) {
    maxRow = elf.row;
  }
  if (elf.row < minRow) {
    minRow = elf.row;
  }
  if (elf.col > maxCol) {
    maxCol = elf.col;
  }
  if (elf.col < minCol) {
    minCol = elf.col;
  }
});

let answer = (maxCol - minCol + 1) * (maxRow - minRow + 1) - elves.length;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
