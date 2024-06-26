module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let zToDroppedBricks = new Map();
    let brickSupports = new Map();
    let brickSupportedBy = new Map();
    const DATA = lines
        .map((line, index) => {
            let matches = line.match(/(\d+)/g).map((x) => parseInt(x));
            return [
                { x: matches[0], y: matches[1], z: matches[2] },
                { x: matches[3], y: matches[4], z: matches[5] },
                index,
            ].toSorted((a, b) => a.z - b.z);
        })
        .toSorted((a, b) => a[0].z - b[0].z);

    DATA.forEach((brick) => {
        let dropping = true;
        while (dropping) {
            let overlap = false;

            let startZ = brick[0].z;
            let zDelta = brick[1].z - brick[0].z;

            for (let z = startZ - 1; z > 0; z--) {
                if (!zToDroppedBricks.has(z)) {
                    brick[0].z--;
                    brick[1].z--;
                    continue;
                }
                let droppedBricks = zToDroppedBricks.get(z);
                droppedBricks.forEach((droppedBrick) => {
                    if (brickOverlaps(brick, droppedBrick)) {
                        let droppedBrickKey = droppedBrick[2];
                        let brickKey = brick[2];
                        if (!zToDroppedBricks.has(z + zDelta + 1)) {
                            zToDroppedBricks.set(z + zDelta + 1, []);
                        }
                        zToDroppedBricks.get(z + zDelta + 1).push(brick);

                        if (!brickSupportedBy.has(brickKey)) {
                            brickSupportedBy.set(brickKey, new Set());
                        }
                        brickSupportedBy.get(brickKey).add(droppedBrickKey);

                        if (!brickSupports.has(droppedBrickKey)) {
                            brickSupports.set(droppedBrickKey, new Set());
                        }
                        brickSupports.get(droppedBrickKey).add(brickKey);
                        overlap = true;
                    }
                });
                if (overlap) {
                    dropping = false;
                    break;
                }
                brick[0].z--;
                brick[1].z--;
            }
            if (!overlap) {
                if (!zToDroppedBricks.has(zDelta + 1)) {
                    zToDroppedBricks.set(zDelta + 1, []);
                }
                zToDroppedBricks.get(zDelta + 1).push(brick);
                dropping = false;
            }
        }
    });

    const answer = DATA.reduce((total, curr) => {
        let currBrickSupports = brickSupports.get(curr[2]);
        if (currBrickSupports == null) {
            return total + 1;
        }
        let allGood = true;
        currBrickSupports.forEach((brick) => {
            if (brickSupportedBy.get(brick) == null || brickSupportedBy.get(brick).size <= 1) {
                allGood = false;
            }
        });

        return total + (allGood ? 1 : 0);
    }, 0);

    function brickOverlaps(brick1, brick2) {
        // Check if brick1 is to the right of brick2 or brick2 is to the right of brick1
        if (brick1[1].x < brick2[0].x || brick2[1].x < brick1[0].x) {
            return false;
        }

        // Check if brick1 is above brick2 or brick2 is above brick1
        if (brick1[1].y < brick2[0].y || brick2[1].y < brick1[0].y) {
            return false;
        }

        // If none of the above conditions are true, the bricks overlap
        return true;
    }
    return { value: answer };
}
