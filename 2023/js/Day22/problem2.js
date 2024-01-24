const fr = require('../../../tools/fileReader');
const OUTPUT = require('../../../tools/output');
const [YEAR, DAY, PART] = ['2023', '22', '1'];

let zToDroppedBricks = new Map();
let brickSupports = new Map();
let brickSupportedBy = new Map();
const DATA = fr
    .getInput(YEAR, DAY)
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
                        zToDroppedBricks.set(z + zDelta + 1, new Set());
                    }
                    zToDroppedBricks.get(z + zDelta + 1).add(brick);

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
                zToDroppedBricks.set(zDelta + 1, new Set());
            }
            zToDroppedBricks.get(zDelta + 1).add(brick);
            dropping = false;
        }
    }
});

let answer = DATA.reduce((total, curr) => {
    let deadBricks = new Set([curr[2]]);
    totalBrickFalls(curr[2], deadBricks);

    return total + deadBricks.size - 1;
}, 0);

function totalBrickFalls(brick, deadBricks) {
    let currBrickSupports = brickSupports.get(brick);

    if (currBrickSupports == null) {
        return;
    }

    let localDeadBricks = new Set();
    currBrickSupports.forEach((x) => {
        supportedBy = brickSupportedBy.get(x);
        let noLongerSupported = true;
        supportedBy.forEach((y) => {
            if (!deadBricks.has(y)) {
                noLongerSupported = false;
            }
        });

        if (noLongerSupported) {
            localDeadBricks.add(x);
            deadBricks.add(x);
        }
    });

    localDeadBricks.forEach((x) => {
        totalBrickFalls(x, deadBricks);
    });
    return;
}

function brickOverlaps(brick1, brick2) {
    if (brick1[1].x < brick2[0].x || brick2[1].x < brick1[0].x) {
        return false;
    }

    if (brick1[1].y < brick2[0].y || brick2[1].y < brick1[0].y) {
        return false;
    }

    return true;
}

OUTPUT.output(YEAR, DAY, PART, answer);
