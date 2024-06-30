export default function solve({ lines, rawData }) {
    const [LEFT, RIGHT, UP, DOWN] = ['L', 'R', 'U', 'D'];
    const [HOR, VERT] = ['h', 'v'];

    class Segment {
        distToReach;
        point1;
        point2;
        constructor(distToReach, point1, point2) {
            this.distToReach = distToReach;
            this.point1 = point1;
            this.point2 = point2;
        }
    }

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
            let distToReach = 0;
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

                s.get(orientation).add(new Segment(distToReach, [x, y], [newX, newY]));
                distToReach += Math.abs(x - newX) + Math.abs(y - newY);
                x = newX;
                y = newY;
            });
        });

    let intersections = new Set();
    getIntersections(segments1, segments2);
    getIntersections(segments2, segments1);

    const answer = [...intersections].sort((a, b) => a - b)[0];

    function getIntersections(horizontalSegments, verticalSegments) {
        horizontalSegments.get(HOR).forEach((horSeg) => {
            let [horP1, horP2] = [horSeg.point1, horSeg.point2];
            let y = horP1[1];
            let [lowX, highX] = [horP1[0], horP2[0]].sort((a, b) => a - b);
            verticalSegments.get(VERT).forEach((vertSeg) => {
                let [vertP1, vertP2] = [vertSeg.point1, vertSeg.point2];
                let x = vertP1[0];
                let [lowY, highY] = [vertP1[1], vertP2[1]].sort((a, b) => a - b);
                if (lowY <= y && y <= highY && lowX <= x && x <= highX) {
                    let totalVertSegDist = vertSeg.distToReach + Math.abs(vertP1[1] - y);
                    let totalHorSegDist = horSeg.distToReach + Math.abs(horP1[0] - x);
                    let totalDist = totalVertSegDist + totalHorSegDist;
                    intersections.add(totalDist);
                }
            });
        });
    }
    return { value: answer };
}
