module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let nodes = new Map();

    lines.forEach((line) => {
        line = line.split(' ');
        let parent = line[1];
        let child = line[7];

        if (!nodes.has(child)) {
            nodes.set(child, { name: child, parents: [] });
        }
        if (!nodes.has(parent)) {
            nodes.set(parent, { name: parent, parents: [] });
        }

        nodes.get(child).parents.push(parent);
    });

    let answer = '';
    let available = [];
    while (nodes.size > 1) {
        let next = [...nodes.keys()].filter((node) => {
            return nodes.get(node).parents.length === 0 && !available.includes(node);
        });

        available.push(...next);
        available.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
        let letter = available.pop();

        answer += letter;
        nodes.delete(letter);
        for (let node of nodes.values()) {
            node.parents = node.parents.filter((parent) => parent !== letter);
        }
    }
    answer += nodes.keys().next().value;
    return { value: answer };
}
