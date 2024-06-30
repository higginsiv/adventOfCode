export default function solve({ lines, rawData }) {
    let answer;
    function getWeight(key) {
        let node = nodes.get(key);
        if (node.totalWeight) {
            return node.totalWeight;
        }

        let childrenWeight = 0;
        let childrenWeights = [];

        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            const childWeight = getWeight(child);
            childrenWeights.push(childWeight);
            childrenWeight += childWeight;
        }

        let deltaWeight;
        if (childrenWeights.length > 0 && answer === undefined) {
            let commonWeights = childrenWeights.filter(
                (weight, index, self) => self.indexOf(weight) !== index,
            );
            let uniqueWeight = childrenWeights.filter((weight) => weight !== commonWeights[0]);

            if (uniqueWeight.length > 0) {
                deltaWeight = commonWeights[0] - uniqueWeight[0];
                answer =
                    nodes.get(node.children[childrenWeights.indexOf(uniqueWeight[0])]).weight +
                    deltaWeight;
            }
        }

        node.totalWeight = node.weight + childrenWeight;
        return node.totalWeight;
    }

    let nodes = new Map();
    lines.forEach((line) => {
        line = line.match(/\w+/g);
        line[1] = parseInt(line[1]);
        let children = [];

        if (line.length > 2) {
            for (let i = 2; i < line.length; i++) {
                children.push(line[i]);
            }
        }

        let node = nodes.get(line[0]);
        if (!node) {
            node = {};
        }
        node.weight = line[1];
        node.children = children;
        node.key = line[0];

        nodes.set(line[0], node);

        children.forEach((child) => {
            let childNode = nodes.get(child);
            if (!childNode) {
                childNode = {};
            }
            childNode.parent = line[0];
            childNode.key = child;
            nodes.set(child, childNode);
        });
    });

    const rootKey = [...nodes.values()].filter((node) => !node.parent)[0];
    let root = nodes.get(rootKey.key);

    getWeight(root.key);
    return { value: answer };
}
