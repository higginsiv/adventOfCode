export default function solve({ lines, rawData }) {
    const [ON, OFF] = ['#', '.'];
    const STEPS = 100;
    const [LENGTH, WIDTH] = [100, 100];

    let lights = lines.map((line) => line.split(''));

    for (let i = 0; i < STEPS; i++) {
        let newLights = new Array(LENGTH);

        for (let s = 0; s < LENGTH; s++) {
            newLights[s] = Array(WIDTH);
        }

        for (let j = 0; j < LENGTH; j++) {
            for (let k = 0; k < WIDTH; k++) {
                let status = lights[j][k];

                let neighborsWithLights = getNeighborsWithLights(j, k);

                if (status === ON) {
                    if (neighborsWithLights == 2 || neighborsWithLights == 3) {
                        newLights[j][k] = ON;
                    } else {
                        newLights[j][k] = OFF;
                    }
                } else if (status === OFF) {
                    if (neighborsWithLights == 3) {
                        newLights[j][k] = ON;
                    } else {
                        newLights[j][k] = OFF;
                    }
                } else {
                    console.log('error');
                }
            }
        }
        lights = newLights;
    }

    function getNeighborsWithLights(x, y) {
        let withLights = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i < 0 || i >= LENGTH || j < 0 || j >= WIDTH || (x === i && y === j)) {
                    continue;
                }

                if (lights[i][j] == ON) {
                    withLights++;
                }
            }
        }
        return withLights;
    }

    const answer = lights.reduce((total, curr) => {
        return (
            total +
            curr.reduce((lineTotal, lineCurr) => {
                return lineTotal + (lineCurr == ON ? 1 : 0);
            }, 0)
        );
    }, 0);

    return { value: answer };
}
