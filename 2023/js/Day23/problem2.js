const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const ITERATION = require('../../../tools/iteration');
const [YEAR, DAY, PART] = ['2023', '23', '2'];

const [FOREST, PATH] = ['#', '.'];
const [NORTH, EAST, SOUTH, WEST] = ['^', '>', 'v', '<'];
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

let start = { x: 0, y: 0, key: -1 };
let goal;
let junctionPoints = [];
const GRID = fr.getInput(YEAR, DAY).map((line, index, grid) => {
  if (index === 0) {
    start.y = line.indexOf(PATH);
  }

  if (index === grid.length - 1) {
    goal = { x: index, y: line.indexOf(PATH), key: 1000 };
  }

  line = line.split('');
  return line;
});

let junctionKeyNum = 0;
let junctionPointsString = new Set();
GRID.forEach((line, x) => {
  line.forEach((point, y) => {
    if (point === PATH) {
      let neighbors = getValidNeighbors({ x: x, y: y }, point);
      let neighborCount = 0;
      neighbors.forEach((neighbor) => {
        if (DIRECTIONS.includes(GRID[neighbor.x][neighbor.y])) {
          neighborCount++;
        }
      });
      if (neighborCount >= 3) {
        junctionPoints.push({ x: x, y: y, key: junctionKeyNum++ });
        junctionPointsString.add(generateKey(x, y));
      }
    }
  });
});
junctionPoints.unshift(start);
junctionPoints.push(goal);

let distances = Array.from({ length: GRID.length }, () => Array(GRID[0].length).fill(-Infinity));
distances[start.x][start.y] = 0;

let junctionToJunctionDistances = new Map();

for (let i = 0; i < junctionPoints.length; i++) {
  for (let j = i + 1; j < junctionPoints.length; j++) {
    let queue = [{ point: junctionPoints[i], distance: 0, visited: new Set() }];

    while (queue.length > 0) {
      let current = queue.shift();

      if (current.point.x === junctionPoints[j].x && current.point.y === junctionPoints[j].y) {
        if (junctionToJunctionDistances.get(junctionPoints[i].key) === undefined) {
          junctionToJunctionDistances.set(junctionPoints[i].key, new Map());
        }
        junctionToJunctionDistances
          .get(junctionPoints[i].key)
          .set(junctionPoints[j].key, current.distance);

        if (junctionToJunctionDistances.get(junctionPoints[j].key) === undefined) {
          junctionToJunctionDistances.set(junctionPoints[j].key, new Map());
        }
        junctionToJunctionDistances
          .get(junctionPoints[j].key)
          .set(junctionPoints[i].key, current.distance);
        break;
      }

      let neighbors = getValidNeighbors(current.point, GRID[current.point.x][current.point.y]);

      neighbors.forEach((neighbor) => {
        let neighborKey = generateKey(neighbor.x, neighbor.y);
        if (
          junctionPointsString.has(neighborKey) &&
          neighborKey !== generateKey(junctionPoints[j].x, junctionPoints[j].y)
        ) {
          return;
        }
        if (current.visited.has(neighborKey)) {
          return;
        }

        if (GRID[neighbor.x][neighbor.y] === FOREST) {
          return;
        }

        let newVisited = new Set(current.visited);
        newVisited.add(neighborKey);
        queue.push({
          point: neighbor,
          distance: current.distance + 1,
          visited: newVisited,
        });
      });
    }
  }
}

console.log(junctionToJunctionDistances);
let distancesToJunctions = new Map();
let visited = new Set();
visited.add(start.key);
let queue = [{ key: -1, distance: 0, visited: visited }];
let longestTrip = -Infinity;

while (queue.length > 0) {
  let current = queue.pop();
  // console.log(current.visited.size)
  if (current.key === goal.key) {
    longestTrip = Math.max(longestTrip, current.distance);
    console.log(longestTrip);
    continue;
  }

  let neighbors = [...junctionToJunctionDistances.get(current.key).keys()].filter(
    (key) => !current.visited.has(key),
  );

  neighbors.forEach((neighbor) => {
    let neighborKey = neighbor;
    if (current.visited.has(neighborKey)) {
      return;
    }

    // if (distancesToJunctions.get(neighbor) != null && distancesToJunctions.get(neighbor) > current.distance + junctionToJunctionDistances.get(current.key).get(neighbor)) {
    //     return;
    // }

    let newVisited = new Set(current.visited);
    newVisited.add(neighborKey);
    // if (sumRemainingEdges(junctionToJunctionDistances, newVisited) + junctionToJunctionDistances.get(current.key).get(neighbor) < longestTrip) {
    //     return;
    // }

    // this ignores long distances that ultimately fail to reach junction
    distancesToJunctions.set(
      neighbor,
      current.distance + junctionToJunctionDistances.get(current.key).get(neighbor),
    );
    queue.push({
      key: neighbor,
      distance: current.distance + junctionToJunctionDistances.get(current.key).get(neighbor),
      visited: newVisited,
    });
  });
}

function getValidNeighbors(point, value) {
  let neighbors = [];

  let includeNorth = point.x > 0;
  let includeEast = point.y < GRID[0].length - 1;
  let includeSouth = point.x < GRID.length - 1;
  let includeWest = point.y > 0;

  if (includeNorth) {
    neighbors.push({ x: point.x - 1, y: point.y, dir: NORTH });
  }

  if (includeEast) {
    neighbors.push({ x: point.x, y: point.y + 1, dir: EAST });
  }

  if (includeSouth) {
    neighbors.push({ x: point.x + 1, y: point.y, dir: SOUTH });
  }

  if (includeWest) {
    neighbors.push({ x: point.x, y: point.y - 1, dir: WEST });
  }

  return neighbors;
}

function sumRemainingEdges(junctionToJunctionDistances, visited) {
  let sum = 0;
  for (let i = 0; i < junctionPoints.length; i++) {
    if (visited.has(junctionPoints[i].key)) {
      continue;
    }
    let max = -Infinity;
    for (let j = 0; j < junctionPoints.length; j++) {
      if (i === j) {
        continue;
      }
      if (visited.has(junctionPoints[j].key)) {
        continue;
      }
      max = Math.max(
        max,
        junctionToJunctionDistances.get(junctionPoints[i].key).get(junctionPoints[j].key),
      );
    }
    sum += max;
  }
  return sum;
}

function generateKey(x, y) {
  return `${x},${y}`;
}

let answer = longestTrip;

OUTPUT.output(YEAR, DAY, PART, answer);
