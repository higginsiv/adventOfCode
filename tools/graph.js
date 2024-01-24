// Description: A graph traversal algorithm that can be used to find the best path through a graph.

/**
 * A representation of a decision point in a graph
 */
class Node {
  name;
  edges = [];
  constructor(name) {
    this.name = name;
  }
}

/**
 * Connects two Nodes together with a weight/cost
 */
class Edge {
  startNode;
  endNode;
  weight;
  constructor(startNode, endNode, weight) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.weight = weight;
  }
}

/**
 * A representation of a state in the graph traversal. Keeps track of all nodes visited and the total weight of the traversal.
 */
class State {
  currNode;
  totalWeight;
  visited = [];
  constructor(currNode, totalWeight, visited) {
    this.currNode = currNode;
    this.totalWeight = totalWeight;
    this.visited = visited;
  }
}

// todo can I add sorting and an early termination condition?
// todo rename "data"
/**
 *
 * @param {*} startNode
 * @param {*} data untyped data that is used to help evaluate if the Goal has been reached
 * @param {*} reachedGoalCallback function that evaluates if the goal has been reached.
 * @param {*} determineBestStateCallback function that compares whether a given state is that has reached the Goal is better than the current best state.
 * @param {*} pruneCallback function that prematurely ends the traversal if the current state is worse than the best state.
 * @returns
 */
function traverse(startNode, data, reachedGoalCallback, determineBestStateCallback, pruneCallback) {
  let startState = new State(startNode, 0, [startNode.name]);
  let queue = [startState];
  let bestState;
  while (queue.length > 0) {
    let state = queue.shift();

    if (pruneCallback && bestState) {
      if (pruneCallback(bestState, state)) {
        continue;
      }
    }

    if (reachedGoalCallback(state, data)) {
      // todo if I mandate prune can I get rid of this determineBestState call here?
      bestState = bestState != null ? determineBestStateCallback(bestState, state) : state;
    } else {
      for (const option of state.currNode.edges) {
        if (!state.visited.includes(option.endNode.name)) {
          queue.push(
            new State(
              option.endNode,
              state.totalWeight + option.weight,
              state.visited.concat([option.endNode.name]),
            ),
          );
        }
      }
    }
  }

  return bestState;
}

module.exports = {
  traverse: traverse,
  Node: Node,
  Edge: Edge,
  State: State,
};
