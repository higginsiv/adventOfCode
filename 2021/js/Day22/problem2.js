module.exports = {solve: solve};

function solve({lines, rawData}) {
    const MIN = -50;
    const MAX = 50;
    const ON = 1;

    const instructions = parseData(lines);
    let on = new Set();
    instructions.forEach(instruction => {
        
    });

    const answer = on.size;
    return {value: answer};
}

function parseData(lines) {
    return lines.map(line => {
        line = line.replace('on', '1');
        line = line.replace('off', '0');
        line = line.match(/-?\d+/g).map(Number);
        return line;
    });
}

function breakCuboidsUp(cube1, cube2) {
    // No overlap
    if (cube1.x2 < cube2.x1 || cube1.x1 > cube2.x2) {
        return [cube1, cube2];
    }

    // cube1 is inside cube2
    if (cube1.x1 >= cube2.x1 && cube1.x2 <= cube2.x2) {
        // TODO - label cubes as on or off
        return [
            {x1: cube2.x1, x2: cube1.x1 - 1},
            {x1: cube1.x2 + 1, x2: cube2.x2},
            {x1: cube1.x1, x2: cube1.x2}
        ];
    }

    // cube2 is inside cube1
    if (cube2.x1 >= cube1.x1 && cube2.x2 <= cube1.x2) {
        // TODO - label cubes as on or off
        return [
            {x1: cube1.x1, x2: cube2.x1 - 1},
            {x1: cube2.x2 + 1, x2: cube1.x2},
            {x1: cube2.x1, x2: cube2.x2}
        ];
    }

    // cube1 overlaps on the left
    if (cube1.x1 < cube2.x1) {
        return [
            {x1: cube1.x1, x2: cube2.x1 - 1},
            {x1: cube2.x1, x2: cube1.x2},
            {x1: cube1.x2 + 1, x2: cube2.x2}
        ];
    }

    // cube1 overlaps on the right
    return [
        {x1: cube2.x1, x2: cube1.x1 - 1},
        {x1: cube1.x1, x2: cube2.x2},
        {x1: cube1.x1, x2: cube1.x2}
    ];
}