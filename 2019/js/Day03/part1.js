export default function solve({ lines, rawData }) {
    const { abs } = Math;
    const [LEFT, RIGHT, UP, DOWN] = ['L', 'R', 'U', 'D'];
    const [HOR, VERT] = ['h', 'v'];

    let x = 0;
    let y = 0;
    let segments1 = new Map([
        [HOR, new Set()],
        [VERT, new Set()],
    ]);
    let segments2 = new Map([
        [HOR, new Set()],
        [VERT, new Set()],
    ]);
    let segments = [segments1, segments2];

    const data = lines
        .map((x) => {
            x = x.split(',').map((y) => {
                y = y.split('');
                return [y.shift(), parseInt(y.join(''))];
            });
            return x;
        })
        .forEach((instruction, index) => {
            let s = segments[index];
            x = 0;
            y = 0;
            instruction.forEach(([dir, mag]) => {
                let newX = x;
                let newY = y;
                switch (dir) {
                    case LEFT:
                        newX -= mag;
                        break;
                    case RIGHT:
                        newX += mag;
                        break;
                    case UP:
                        newY += mag;
                        break;
                    case DOWN:
                        newY -= mag;
                        break;
                }
                let orientation = newY === y ? HOR : VERT;

                s.get(orientation).add([
                    [x, y],
                    [newX, newY],
                ]);
                x = newX;
                y = newY;
            });
        });

    let intersections = new Set();
    getIntersections(segments1, segments2);
    getIntersections(segments2, segments1);

    const answer = [...intersections]
        .map((x) => {
            return abs(x[0]) + abs(x[1]);
        })
        .sort((a, b) => a - b)[0];

    function getIntersections(horizontalSegments, verticalSegments) {
        horizontalSegments.get(HOR).forEach(([horP1, horP2]) => {
            let y = horP1[1];
            let [lowX, highX] = [horP1[0], horP2[0]].sort((a, b) => a - b);
            verticalSegments.get(VERT).forEach(([vertP1, vertP2]) => {
                let x = vertP1[0];
                let [lowY, highY] = [vertP1[1], vertP2[1]].sort((a, b) => a - b);
                if (lowY <= y && y <= highY && lowX <= x && x <= highX) {
                    intersections.add([x, y]);
                }
            });
        });
    }
    return { value: answer };
}
