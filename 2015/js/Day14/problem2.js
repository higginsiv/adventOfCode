export default function solve({ lines, rawData }) {
    let reindeer = [];
    let points = new Map();
    const SECONDS = 2503;

    lines.forEach((x) => {
        x = x.replace('can fly ', '');
        x = x.replace('km/s for ', '');
        x = x.replace('seconds, but then must rest for ', '');
        x = x.replace(' seconds.', '');
        const [NAME, SPEED, TIME, REST] = x.split(' ');

        reindeer.push({
            name: NAME,
            fly: parseInt(SPEED),
            time: parseInt(TIME),
            rest: parseInt(REST),
        });
        points.set(NAME, 0);
    });

    for (let i = 1; i <= SECONDS; i++) {
        let inLead = reindeer.reduce(
            (best, curr) => {
                let distance =
                    curr.fly *
                    (curr.time * Math.floor(i / (curr.time + curr.rest)) +
                        (curr.time > i % (curr.time + curr.rest)
                            ? i % (curr.time + curr.rest)
                            : curr.time));
                return distance > best.total ? { name: curr.name, total: distance } : best;
            },
            { name: 'santa', total: -Infinity },
        );

        points.set(inLead.name, points.get(inLead.name) + 1);
    }

    let answer = [...points.values()].sort((a, b) => b - a)[0];
    return { value: answer };
}
