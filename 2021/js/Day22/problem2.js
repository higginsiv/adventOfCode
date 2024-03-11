module.exports = { solve: solve };
const { min, max } = Math;
const ON = 1;
const OFF = -1;

function solve({ lines, rawData }) {
    const instructions = parseData(lines);

    let processedCubes = [];
    instructions.forEach((instruction) => {
        let newCubes = [];
        if (instruction.command === ON) {
            newCubes.push(instruction);
        }

        processedCubes.forEach((cube) => {
            const intersection = getIntersection(instruction, cube);
            if (intersection) {
                newCubes.push(intersection);
            }
        });
        processedCubes.push(...newCubes);
    });

    const answer = processedCubes.reduce((sum, cube) => {
        return (
            sum +
            cube.command *
                (cube.x2 - cube.x1 + 1) *
                (cube.y2 - cube.y1 + 1) *
                (cube.z2 - cube.z1 + 1)
        );
    }, 0);
    return { value: answer };
}

function parseData(lines) {
    return lines.map((line) => {
        line = line.replace('on', ON);
        line = line.replace('off', OFF);
        line = line.match(/-?\d+/g).map(Number);
        const command = line[0];
        const x1 = line[1] > line[2] ? line[2] : line[1];
        const x2 = line[1] > line[2] ? line[1] : line[2];
        const y1 = line[3] > line[4] ? line[4] : line[3];
        const y2 = line[3] > line[4] ? line[3] : line[4];
        const z1 = line[5] > line[6] ? line[6] : line[5];
        const z2 = line[5] > line[6] ? line[5] : line[6];

        return { command, x1, x2, y1, y2, z1, z2 };
    });
}

function getIntersection(cuboid1, cuboid2) {
    // If the second cuboid is OFF, then we need to add back the intersection. If the second cuboid is ON, then we need to remove the intersection.
    const command = cuboid2.command * -1;
    const x1 = max(cuboid1.x1, cuboid2.x1);
    const x2 = min(cuboid1.x2, cuboid2.x2);
    const y1 = max(cuboid1.y1, cuboid2.y1);
    const y2 = min(cuboid1.y2, cuboid2.y2);
    const z1 = max(cuboid1.z1, cuboid2.z1);
    const z2 = min(cuboid1.z2, cuboid2.z2);

    if (x1 > x2 || y1 > y2 || z1 > z2) {
        return null;
    }

    return { command, x1, x2, y1, y2, z1, z2 };
}
