module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((command) => command.split(' '));

    const root = '/';

    class Dir {
        name;
        parent;
        children = new Map();
        size = 0;
        constructor(name, parent) {
            this.name = name;
            this.parent = parent;
        }
    }

    let disk = new Dir(root);
    let currDir = disk;

    data.forEach((command) => {
        [arg1, arg2, arg3] = command;
        if (arg1 === '$') {
            if (arg2 === 'cd') {
                if (arg3 === '..') {
                    currDir = currDir.parent;
                } else if (arg3 === root) {
                    currDir = disk;
                } else {
                    currDir = currDir.children.get(arg3);
                }
            }
        } else if (arg1 === 'dir') {
            currDir.children.set(arg2, new Dir(arg2, currDir));
        } else {
            currDir.size += parseInt(arg1);
        }
    });

    const maxDirSize = 100000;
    let sumUnderMax = 0;
    calculateSize(disk);

    function calculateSize(dir) {
        let total = Array.from(dir.children.values()).reduce(
            (acc, currDir) => acc + calculateSize(currDir),
            dir.size,
        );

        if (total < maxDirSize) {
            sumUnderMax += total;
        }
        return total;
    }

    const answer = sumUnderMax;
    return { value: answer };
}
