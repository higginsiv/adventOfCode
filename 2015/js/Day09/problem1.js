module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const GRAPH = require('../../../tools/graph');

    let nodes = new Map();
    lines.forEach((x) => {
        const [START, PREP, END, EQUALS, WEIGHT] = x.split(' ');
        let startNode = nodes.get(START);
        if (startNode == null) {
            startNode = new GRAPH.Node(START);
            nodes.set(START, startNode);
        }

        let endNode = nodes.get(END);
        if (endNode == null) {
            endNode = new GRAPH.Node(END);
            nodes.set(END, endNode);
        }

        startNode.edges.push(new GRAPH.Edge(startNode, endNode, parseInt(WEIGHT)));
        endNode.edges.push(new GRAPH.Edge(endNode, startNode, parseInt(WEIGHT)));
    });

    let answer = [...nodes.values()].reduce((total, curr) => {
        let shortestDistance = GRAPH.traverse(
            curr,
            { nodeList: [...nodes.keys()] },
            reachedGoal,
            determineBestState,
            prune,
        ).totalWeight;
        return shortestDistance < total ? shortestDistance : total;
    }, Infinity);

    function reachedGoal(state, data) {
        return data.nodeList.every((el) => state.visited.includes(el));
    }

    function determineBestState(state1, state2) {
        return state1.totalWeight < state2.totalWeight ? state1 : state2;
    }

    function prune(bestState, state) {
        return bestState.totalWeight < state.totalWeight;
    }

    return { value: answer };
}
