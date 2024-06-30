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
    });

    const vertSteps = abs(x - y) / 2;
    const answer = abs(min(x, y) + vertSteps);
    return { value: answer };
}
