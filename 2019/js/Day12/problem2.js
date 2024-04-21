module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const math = require('../../../tools/math.js');
    const DELIM = '|';

    class Moon {
        x;
        y;
        z;
        xVel;
        yVel;
        zVel;
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.xVel = 0;
            this.yVel = 0;
            this.zVel = 0;
        }
    }
    const moons = lines.map((line) => {
        line = line.replace('<x=', '');
        line = line.replace(' y=', '');
        line = line.replace(' z=', '');
        line = line.replace('>', '');
        line = line.split(',').map((x) => parseInt(x));
        return new Moon(...line);
    });

    let xStates = new Set();
    let yStates = new Set();
    let zStates = new Set();

    let xSteps;
    let ySteps;
    let zSteps;
    let steps = 0;
    while (xSteps == null || ySteps == null || zSteps == null) {
        // Adjust velocities
        for (let j = 0; j < moons.length; j++) {
            for (let k = 0; k < moons.length; k++) {
                if (j === k) {
                    continue;
                }
                let moonToChange = moons[j];
                let referenceMoon = moons[k];

                moonToChange.xVel =
                    moonToChange.x > referenceMoon.x
                        ? moonToChange.xVel - 1
                        : moonToChange.x < referenceMoon.x
                          ? moonToChange.xVel + 1
                          : moonToChange.xVel;
                moonToChange.yVel =
                    moonToChange.y > referenceMoon.y
                        ? moonToChange.yVel - 1
                        : moonToChange.y < referenceMoon.y
                          ? moonToChange.yVel + 1
                          : moonToChange.yVel;
                moonToChange.zVel =
                    moonToChange.z > referenceMoon.z
                        ? moonToChange.zVel - 1
                        : moonToChange.z < referenceMoon.z
                          ? moonToChange.zVel + 1
                          : moonToChange.zVel;
            }
        }

        // Adjust positions
        for (let j = 0; j < moons.length; j++) {
            let moon = moons[j];
            moon.x += moon.xVel;
            moon.y += moon.yVel;
            moon.z += moon.zVel;
        }
        let xKey = getXStateKey();
        let yKey = getYStateKey();
        let zKey = getZStateKey();

        if (!xStates.has(xKey)) {
            xStates.add(xKey);
        } else if (!xSteps) {
            xSteps = steps;
        }

        if (!yStates.has(yKey)) {
            yStates.add(yKey);
        } else if (!ySteps) {
            ySteps = steps;
        }

        if (!zStates.has(zKey)) {
            zStates.add(zKey);
        } else if (!zSteps) {
            zSteps = steps;
        }

        steps++;
    }

    function getXStateKey() {
        let key = '';
        for (let i = 0; i < moons.length; i++) {
            let moon = moons[i];
            key += moon.x + DELIM + moon.xVel + DELIM;
        }
        return key;
    }

    function getYStateKey() {
        let key = '';
        for (let i = 0; i < moons.length; i++) {
            let moon = moons[i];
            key += moon.y + DELIM + moon.yVel + DELIM;
        }
        return key;
    }

    function getZStateKey() {
        let key = '';
        for (let i = 0; i < moons.length; i++) {
            let moon = moons[i];
            key += moon.z + DELIM + moon.zVel + DELIM;
        }
        return key;
    }

    let answer = math.getLCM(xSteps, ySteps);
    answer = math.getLCM(answer, zSteps);
    return { value: answer };
}
