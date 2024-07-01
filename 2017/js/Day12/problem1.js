export default function solve({ lines, rawData }) {
    let programs = new Map();

    lines.forEach((line) => {
        let [program, connections] = line.split(' <-> ');
        program = parseInt(program);
        programs.set(program, connections.split(', ').map(Number));
    });

    const goal = 0;
    let programsInGroup = 0;

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
        if (visited.includes(goal)) {
            programsInGroup = visited.length;
            break;
        }
        visited.forEach((program) => {
            programs.delete(program);
        });
    }

    const answer = programsInGroup;
    return { value: answer };
}
