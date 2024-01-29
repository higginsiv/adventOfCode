module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function moveParticle(particle) {
        particle.v.x += particle.a.x;
        particle.v.y += particle.a.y;
        particle.v.z += particle.a.z;

        particle.p.x += particle.v.x;
        particle.p.y += particle.v.y;
        particle.p.z += particle.v.z;
    }

    let particles = lines.map((line) => {
        line = line.match(/-?\d+/g).map(Number);

        return {
            p: { x: line[0], y: line[1], z: line[2] },
            v: { x: line[3], y: line[4], z: line[5] },
            a: { x: line[6], y: line[7], z: line[8] },
        };
    });

    for (let i = 0; i < 50; i++) {
        let positions = {};
        particles.forEach((particle, index) => {
            moveParticle(particle);
            const position = `${particle.p.x},${particle.p.y},${particle.p.z}`;

            if (positions[position] === undefined) {
                positions[position] = [index];
            } else {
                positions[position].push(index);
            }
        });

        for (let position in positions) {
            if (positions[position].length > 1) {
                positions[position].forEach((index) => {
                    particles[index] = null;
                });
            }
        }

        particles = particles.filter((particle) => particle !== null);
    }

    let answer = particles.length;
    return { value: answer };
}
