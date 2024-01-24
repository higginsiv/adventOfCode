const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2022', '18', '2'];
const data = fr.getInput(year, day).map((x) => x.split(',').map((y) => parseInt(y)));

let jsonData = data.slice().map((x) => JSON.stringify(x));

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;
let minZ = Infinity;
let maxZ = -Infinity;
let flooded = [];
let lava = [];

data.forEach((p) => {
  const [x, y, z] = p;
  if (x < minX) {
    minX = x;
  } else if (x > maxX) {
    maxX = x;
  }

  if (y < minY) {
    minY = y;
  } else if (y > maxY) {
    maxY = y;
  }

  if (z < minZ) {
    minZ = z;
  } else if (z > maxZ) {
    maxZ = z;
  }
});

function inBounds(point) {
  const [x, y, z] = point;
  if (
    x < minX - 2 ||
    x > maxX + 2 ||
    y < minY - 2 ||
    y > maxY + 2 ||
    z < minZ - 2 ||
    z > maxZ + 2
  ) {
    return false;
  }
  return true;
}

function getAdjacent(x, y, z) {
  let left = [x - 1, y, z];
  let right = [x + 1, y, z];
  let front = [x, y, z + 1];
  let back = [x, y, z - 1];
  let top = [x, y + 1, z];
  let bottom = [x, y - 1, z];
  let sides = [left, right, front, back, top, bottom];
  return sides;
}

function getLegalAdjacent(x, y, z) {
  let adjacent = [];
  let sides = getAdjacent(x, y, z);

  sides.forEach((p) => {
    jsonP = JSON.stringify(p);
    if (inBounds(p) && !flooded.includes(jsonP) && !lava.includes(jsonP)) {
      adjacent.push(p);
    }
  });
  return adjacent;
}

function getWaterAdjacent(x, y, z) {
  let adjacent = [];
  let sides = getAdjacent(x, y, z);

  sides.forEach((p) => {
    jsonP = JSON.stringify(p);
    if (flooded.includes(jsonP)) {
      adjacent.push(p);
    }
  });
  return adjacent;
}

function flood(x, y, z) {
  let queueBcRecursionBetrayedMe = [[x, y, z]];
  flooded.push(JSON.stringify([x, y, z]));
  while (queueBcRecursionBetrayedMe.length > 0) {
    let [cx, cy, cz] = queueBcRecursionBetrayedMe.shift();

    let adjacent = getLegalAdjacent(cx, cy, cz);
    adjacent.forEach((p) => {
      let jsonP = JSON.stringify(p);
      // got too lazy to change data loading up top
      if (jsonData.includes(jsonP) && !lava.includes(jsonP)) {
        lava.push(jsonP);
      } else {
        flooded.push(jsonP);
        queueBcRecursionBetrayedMe.push(p);
      }
    });
  }
}

flood(0, 0, 0);
let answer = lava.reduce((total, current) => {
  [x, y, z] = JSON.parse(current);
  let waterAdjacent = getWaterAdjacent(x, y, z);
  return total + waterAdjacent.length;
}, 0);

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
