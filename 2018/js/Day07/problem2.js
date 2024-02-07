module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let nodes = new Map();

    lines.forEach((line) => {
        line = line.split(' ');
        let parent = line[1];
        let child = line[7];

        if (!nodes.has(child)) {
            nodes.set(child, { name: child, parents: [], time: child.charCodeAt(0) - 4 });
        }
        if (!nodes.has(parent)) {
            nodes.set(parent, { name: parent, parents: [], time: parent.charCodeAt(0) - 4 });
        }

        nodes.get(child).parents.push(parent);
    });

    let available = [];
    let workers = [];
    let currentTime = 0;
    while (nodes.size > 0) {
        if (workers.length > 0) {
            let { letter, finishTime } = workers.pop();
            currentTime = finishTime;
            nodes.delete(letter);
            for (let node of nodes.values()) {
                node.parents = node.parents.filter((parent) => parent !== letter);
            }
        }

        let next = [...nodes.keys()].filter((node) => {
            return (
                nodes.get(node).parents.length === 0 &&
                !available.includes(node) &&
                !workers.some((worker) => worker.letter === node)
            );
        });

        available.push(...next);
        available.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));

        while (workers.length < 5 && available.length > 0) {
            const letter = available.pop();
            workers.push({ letter, finishTime: currentTime + nodes.get(letter).time });
        }
        workers.sort((a, b) => b.finishTime - a.finishTime);
    }

    return { value: currentTime };
}
