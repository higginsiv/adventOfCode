class Node {
    name;
    edges = [];
    constructor(name) {
        this.name = name;
    }
}

class Edge {
    startNode;
    endNode;
    weight;
    constructor(startNode, endNode, weight) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.weight = weight
    }
}

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
                    queue.push(new State(option.endNode, state.totalWeight + option.weight, state.visited.concat([option.endNode.name])));
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
    State: State
};

