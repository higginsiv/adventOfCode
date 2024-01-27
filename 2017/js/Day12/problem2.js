module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let programs = new Map();

    lines.forEach((line) => {
        let [program, connections] = line.split(' <-> ');
        program = parseInt(program);
        programs.set(program, connections.split(', ').map(Number));
    });

    const goal = 0;
    let numGroups = 0;

    while (programs.size > 0) {
        let queue = [[...programs.keys()][0]];
        let current = null;
        let visited = [];
        while (queue.length > 0) {
            current = queue.shift();
            if (visited.includes(current)) {
                continue;
            }
            visited.push(current);
            queue = queue.concat(programs.get(current));
        }
        numGroups++;
        visited.forEach((program) => {
            programs.delete(program);
        });
    }

    const answer = numGroups;
    return { value: answer };
}
