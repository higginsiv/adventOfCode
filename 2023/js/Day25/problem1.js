const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2023', '25', '1'];

let nodesToDestinations = new Map();
const DATA = fr
  .getInput(YEAR, DAY)
  .map((line) => line.match(/\w+/g))
  .forEach((line) => {
    let mainNode = line[0];
    let otherNodes = line.slice(1);

    otherNodes.forEach((node) => {
      if (!nodesToDestinations.has(mainNode)) {
        nodesToDestinations.set(mainNode, []);
      }
      nodesToDestinations.get(mainNode).push(node);

      if (!nodesToDestinations.has(node)) {
        nodesToDestinations.set(node, []);
      }
      nodesToDestinations.get(node).push(mainNode);
    });
  });

function calculateBetweenness(graph) {
  let edgeBetweenness = new Map();
  let totalPaths = 0;

  for (let node of graph.keys()) {
    let [distance, parents] = bfs(graph, node);
    let nodeBetweenness = new Map();
    for (let [node1, node2] of [...parents.entries()]) {
      if (node2 != null) {
        let edge = [node1, node2].sort().join('-');
        if (!nodeBetweenness.has(edge)) {
          nodeBetweenness.set(edge, 0);
        }
        nodeBetweenness.set(edge, nodeBetweenness.get(edge) + 1);
        totalPaths++;
      }
    }

    for (let [edge, betweenness] of nodeBetweenness.entries()) {
      if (!edgeBetweenness.has(edge)) {
        edgeBetweenness.set(edge, 0);
      }
      edgeBetweenness.set(edge, edgeBetweenness.get(edge) + betweenness);
    }
  }

  return edgeBetweenness;
}

function bfs(graph, startNode) {
  let visited = new Set();
  let queue = [startNode];
  let distance = new Map();
  let parents = new Map();
  distance.set(startNode, 0);
  parents.set(startNode, []);

  while (queue.length > 0) {
    let currNode = queue.shift();
    visited.add(currNode);

    for (let neighbor of graph.get(currNode)) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        distance.set(neighbor, distance.get(currNode) + 1);
        if (!parents.has(neighbor)) {
          parents.set(neighbor, []);
        }
        parents.get(neighbor).push(currNode);
      } else if (distance.get(neighbor) === distance.get(currNode) + 1) {
        parents.get(neighbor).push(currNode);
      }
    }
  }

  return [distance, parents];
}

function getSizeOfDisconnectedSections() {
  let visited = new Set();
  let stack = [[...nodesToDestinations.keys()][0]];

  while (stack.length > 0) {
    let currNode = stack.pop();
    visited.add(currNode);
    for (let neighbor of [...nodesToDestinations.get(currNode)]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return [visited.size, nodesToDestinations.size - visited.size];
}

for (let i = 0; i < 3; i++) {
  let betweenness = calculateBetweenness(nodesToDestinations);

  let [node1, node2] = [...betweenness.keys()]
    .sort((a, b) => betweenness.get(b) - betweenness.get(a))[0]
    .split('-');

  nodesToDestinations.get(node1).splice(nodesToDestinations.get(node1).indexOf(node2), 1);
  nodesToDestinations.get(node2).splice(nodesToDestinations.get(node2).indexOf(node1), 1);
}

let answer = getSizeOfDisconnectedSections().reduce((a, b) => a * b);

OUTPUT.output(YEAR, DAY, PART, answer);
