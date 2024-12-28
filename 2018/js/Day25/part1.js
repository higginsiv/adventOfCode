const { abs } = Math;

export default function solve({ lines, rawData }) {
    lines = lines
        .map((line) => line.split(',').map(Number))
        .sort((a, b) => {
            return a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3];
        });

    const constellations = [[lines.shift()]];
    while (lines.length > 0) {
        let currentStar = lines.shift();
        let addedToConstellation = false;
        constellations.forEach((constellation) => {
            if (constellation.some((star) => manhattanDistance(currentStar, star) <= 3)) {
                constellation.push(currentStar);
                addedToConstellation = true;
            }
        });
        if (!addedToConstellation) {
            constellations.push([currentStar]);
        }
    }

    while (true) {
        let fused = false;
        for (let i = 0; i < constellations.length; i++) {
            for (let j = i + 1; j < constellations.length; j++) {
                if (
                    constellations[i].some((star) =>
                        constellations[j].some((otherStar) => {
                            return (
                                star[0] === otherStar[0] &&
                                star[1] === otherStar[1] &&
                                star[2] === otherStar[2] &&
                                star[3] === otherStar[3]
                            );
                        }),
                    )
                ) {
                    constellations[i] = constellations[i].concat(constellations[j]);
                    constellations.splice(j, 1);
                    fused = true;
                }
            }
        }
        if (!fused) {
            break;
        }
    }

    const answer = constellations.length;
    return { value: answer };
}

function manhattanDistance(a, b) {
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2]) + abs(a[3] - b[3]);
}
