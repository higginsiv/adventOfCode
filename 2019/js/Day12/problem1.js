export default function solve({ lines, rawData }) {
    const { abs } = Math;
    const STEPS = 1000;

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

    for (let i = 0; i < STEPS; i++) {
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
    }

    const answer = moons.reduce((total, curr) => {
        return (
            total +
            (abs(curr.x) + abs(curr.y) + abs(curr.z)) *
                (abs(curr.xVel) + abs(curr.yVel) + abs(curr.zVel))
        );
    }, 0);
    return { value: answer };
}
