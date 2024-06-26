export default function solve({ lines, rawData }) {
    const { floor } = Math;
    let reindeer = [];
    const SECONDS = 2503;

    lines.forEach((x) => {
        x = x.replace('can fly ', '');
        x = x.replace('km/s for ', '');
        x = x.replace('seconds, but then must rest for ', '');
        x = x.replace(' seconds.', '');
        const [NAME, SPEED, TIME, REST] = x.split(' ');

        reindeer.push({
            fly: parseInt(SPEED),
            time: parseInt(TIME),
            rest: parseInt(REST),
        });
    });

    let answer = reindeer.reduce((best, curr) => {
        let distance =
            curr.fly *
            (curr.time * floor(SECONDS / (curr.time + curr.rest)) +
                (curr.time > SECONDS % (curr.time + curr.rest)
                    ? SECONDS % (curr.time + curr.rest)
                    : curr.time));
        return distance > best ? distance : best;
    }, -Infinity);
    return { value: answer };
}
