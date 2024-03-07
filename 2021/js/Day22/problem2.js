module.exports = { solve: solve };
const { min, max, abs } = Math;

function solve({ lines, rawData }) {
    const MIN = -50;
    const MAX = 50;
    const ON = 1;

    const instructions = parseData(lines);
    console.log(instructions.length);
    let on = new Set();
    const maxVol = instructions.reduce((maxVol, instruction) => {
        const volume =
            abs(instruction.x2 - instruction.x1) *
            abs(instruction.y2 - instruction.y1) *
            abs(instruction.z2 - instruction.z1);
        if (volume > maxVol) {
            maxVol = volume;
        }
        return maxVol;
    }, 0);
    console.log('maxVol', maxVol);

    const answer = on.size;
    return { value: answer };
}

function parseData(lines) {
    return lines.map((line) => {
        line = line.replace('on', '1');
        line = line.replace('off', '0');
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

function breakCuboidsUp(cube1, cube2) {
    // No overlap
    if (cube2.x1 < cube2.x1 || cube1.x1 > cube2.x2) {
        return [cube1, cube2];
    }

    // cube1 is inside cube2
    if (cube1.x1 >= cube2.x1 && cube2.x1 <= cube2.x2) {
        // TODO - label cubes as on or off
        return [
            { x1: cube2.x1, x2: cube1.x1 - 1 },
            { x1: cube2.x1 + 1, x2: cube2.x2 },
            { x1: cube1.x1, x2: cube2.x1 },
        ];
    }

    // cube2 is inside cube1
    if (cube2.x1 >= cube1.x1 && cube2.x2 <= cube2.x1) {
        // TODO - label cubes as on or off
        return [
            { x1: cube1.x1, x2: cube2.x1 - 1 },
            { x1: cube2.x2 + 1, x2: cube2.x1 },
            { x1: cube2.x1, x2: cube2.x2 },
        ];
    }

    // cube1 overlaps on the left
    if (cube1.x1 < cube2.x1) {
        return [
            { x1: cube1.x1, x2: cube2.x1 - 1 },
            { x1: cube2.x1, x2: cube2.x1 },
            { x1: cube2.x1 + 1, x2: cube2.x2 },
        ];
    }

    // cube1 overlaps on the right
    return [
        { x1: cube2.x1, x2: cube1.x1 - 1 },
        { x1: cube1.x1, x2: cube2.x2 },
        { x1: cube1.x1, x2: cube2.x1 },
    ];
}

function ensureNoOverlap(cuboids) {
    let nonOverlapping = [];

    for (let cuboid of cuboids) {
        if (nonOverlapping.length === 0) {
            nonOverlapping.push(cuboid);
        } else {
            for (let i = 0; i < nonOverlapping.length; i++) {
                let cuboid1 = nonOverlapping[i];
                let cuboid2 = cuboid;

                // Check if the cuboids overlap
                if (
                    cuboid1.x1 > cuboid2.x2 ||
                    cuboid1.x2 < cuboid2.x1 ||
                    cuboid1.y1 > cuboid2.y2 ||
                    cuboid1.y2 < cuboid2.y1 ||
                    cuboid1.z1 > cuboid2.z2 ||
                    cuboid1.z2 < cuboid2.z1
                ) {
                    nonOverlapping.push(cuboid);
                } else {
                    // Calculate the overlapping cuboid
                    let overlap = {
                        x1: max(cuboid1.x1, cuboid2.x1),
                        x2: min(cuboid1.x2, cuboid2.x2),
                        y1: max(cuboid1.y1, cuboid2.y1),
                        y2: min(cuboid1.y2, cuboid2.y2),
                        z1: max(cuboid1.z1, cuboid2.z1),
                        z2: min(cuboid1.z2, cuboid2.z2),
                        status1,
                    };

                    // Subtract the overlapping cuboid from the original cuboids
                    let remaining1 = subtractCuboid(nonOverlapping[i], overlap);
                    let remaining2 = subtractCuboid(cuboid, overlap);

                    // Replace the non-overlapping cuboid with the overlapping and remaining cuboids
                    nonOverlapping.splice(i, 1, overlap, ...remaining1, ...remaining2);
                    i += remaining1.length + remaining2.length;
                }
            }
        }
    }

    return nonOverlapping;
}

// TODO set status based on cuboid that is newest
function splitCuboids(cuboid1, cuboid2) {
    // Check if the cuboids overlap
    if (
        cuboid1.x1 > cuboid2.x2 ||
        cuboid1.x2 < cuboid2.x1 ||
        cuboid1.y1 > cuboid2.y2 ||
        cuboid1.y2 < cuboid2.y1 ||
        cuboid1.z1 > cuboid2.z2 ||
        cuboid1.z2 < cuboid2.z1
    ) {
        return [cuboid1, cuboid2];
    }

    // Calculate the overlapping cuboid
    let overlap = {
        x1: max(cuboid1.x1, cuboid2.x1),
        x2: min(cuboid1.x2, cuboid2.x2),
        y1: max(cuboid1.y1, cuboid2.y1),
        y2: min(cuboid1.y2, cuboid2.y2),
        z1: max(cuboid1.z1, cuboid2.z1),
        z2: min(cuboid1.z2, cuboid2.z2),
        status1,
    };

    // Subtract the overlapping cuboid from the original cuboids
    let remaining1 = subtractCuboid(cuboid1, overlap);
    let remaining2 = subtractCuboid(cuboid2, overlap);

    return [overlap, ...remaining1, ...remaining2];
}

function subtractCuboid(cuboid, overlap) {
    let remaining = [];

    // Subtract along the x-axis
    if (cuboid.x1 < overlap.x1)
        remaining.push({
            x1: cuboid.x1,
            x2: overlap.x1,
            y1: cuboid.y1,
            y2: cuboid.y2,
            z1: cuboid.z1,
            z2: cuboid.z2,
            status: cuboid.status,
        });
    if (x2 > overlap.x2)
        remaining.push({
            x1: overlap.x2,
            x2: cuboid.x2,
            y1: cuboid.y1,
            y2: cuboid.y2,
            z1: cuboid.z1,
            z2: cuboid.z2,
            status: cuboid.status,
        });

    // Subtract along the y-axis
    if (y1 < overlap.y1)
        remaining.push({
            x1: overlap.x1,
            x2: overlap.x2,
            y1: cuboid.y1,
            y2: overlap.y1,
            z1: cuboid.z1,
            z2: cuboid.z2,
            status: cuboid.status,
        });
    if (y2 > overlap.y2)
        remaining.push({
            x1: overlap.x1,
            x2: overlap.x2,
            y1: overlap.y2,
            y2: cuboid.y2,
            z1: cuboid.z1,
            z2: cuboid.z2,
            status: cuboid.status,
        });

    // Subtract along the z-axis
    if (z1 < overlap.z1)
        remaining.push({
            x1: overlap.x1,
            x2: overlap.x2,
            y1: overlap.y1,
            y2: overlap.y2,
            z1: cuboid.z1,
            z2: overlap.z1,
            status: cuboid.status,
        });
    if (z2 > overlap.z2)
        remaining.push({
            x1: overlap.x1,
            x2: overlap.x2,
            y1: overlap.y1,
            y2: overlap.y2,
            z1: overlap.z2,
            z2: cuboid.z2,
            status: cuboid.status,
        });

    return remaining;
}
