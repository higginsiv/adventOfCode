export default function solve({ lines, rawData }) {
    const { abs, min } = Math;
    const [NORTH, SOUTH, NORTHEAST, NORTHWEST, SOUTHEAST, SOUTHWEST] = [
        'n',
        's',
        'ne',
        'nw',
        'se',
        'sw',
    ];

    let allLocations = [];
    let x = 0;
    let y = 0;
    rawData.split(',').forEach((step) => {
        switch (step) {
            case NORTH:
                y += 2;
                break;
            case SOUTH:
                y -= 2;
                break;
            case NORTHEAST:
                x++;
                y++;
                break;
            case NORTHWEST:
                x--;
                y++;
                break;
            case SOUTHEAST:
                x++;
                y--;
                break;
            case SOUTHWEST:
                x--;
                y--;
        }
        allLocations.push([x, y]);
    });

    const answer = allLocations.reduce((acc, curr) => {
        const vertSteps = abs(curr[0] - curr[1]) / 2;
        const steps = abs(min(curr[0], curr[1]) + vertSteps);
        return steps > acc ? steps : acc;
    }, -Infinity);

    return { value: answer };
}
