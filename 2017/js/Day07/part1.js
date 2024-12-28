export default function solve({ lines, rawData }) {
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

    let answer = [...nodes.values()].filter((node) => !node.parent)[0].key;
    return { value: answer };
}
