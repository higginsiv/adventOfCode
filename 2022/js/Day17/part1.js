export default function solve({ lines, rawData }) {
    const [LEFT, RIGHT] = [-1, 1];
    const data = rawData.split('').map((x) => (x === '<' ? LEFT : RIGHT));

    const [HOR, PLUS, EL, VERT, BOX] = [0, 1, 2, 3, 4];
    const SOLID = 1;

    let highY = 0;
    let rowsDeleted = 0;

    class Point {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Rock {
        points = [];
        constructor(leftEdge, highEdge, type) {
            switch (type) {
                case HOR:
                    this.points.push(
                        new Point(leftEdge + 2, highEdge + 3),
                        new Point(leftEdge + 3, highEdge + 3),
                        new Point(leftEdge + 4, highEdge + 3),
                        new Point(leftEdge + 5, highEdge + 3),
                    );
                    break;
                case PLUS:
                    this.points.push(
                        new Point(leftEdge + 2, highEdge + 4),
                        new Point(leftEdge + 3, highEdge + 3),
                        new Point(leftEdge + 3, highEdge + 4),
                        new Point(leftEdge + 3, highEdge + 5),
                        new Point(leftEdge + 4, highEdge + 4),
                    );
                    break;
                case EL:
                    this.points.push(
                        new Point(leftEdge + 2, highEdge + 3),
                        new Point(leftEdge + 3, highEdge + 3),
                        new Point(leftEdge + 4, highEdge + 3),
                        new Point(leftEdge + 4, highEdge + 4),
                        new Point(leftEdge + 4, highEdge + 5),
                    );
                    break;
                case VERT:
                    this.points.push(
                        new Point(leftEdge + 2, highEdge + 3),
                        new Point(leftEdge + 2, highEdge + 4),
                        new Point(leftEdge + 2, highEdge + 5),
                        new Point(leftEdge + 2, highEdge + 6),
                    );
                    break;
                case BOX:
                    this.points.push(
                        new Point(leftEdge + 2, highEdge + 3),
                        new Point(leftEdge + 3, highEdge + 3),
                        new Point(leftEdge + 2, highEdge + 4),
                        new Point(leftEdge + 3, highEdge + 4),
                    );
                    break;
            }
        }
    }

    function moveRock(rock, edge, xDir, yDir) {
        let tempPoints = [];
        for (let i = 0; i < rock.points.length; i++) {
            let p = rock.points[i];
            let tempX = p.x + xDir;
            let tempY = p.y + yDir;

            if (
                tempX < 0 ||
                tempX > 6 ||
                tempY < 0 ||
                (edge[tempY] != null && edge[tempY][tempX] === SOLID)
            ) {
                return rock;
            } else {
                tempPoints.push(new Point(tempX, tempY));
            }
        }

        rock.points = tempPoints;
        return rock;
    }

    function getEdge(rockPoints) {
        rockPoints.forEach((p) => {
            if (p.y + 1 > highY) {
                highY = p.y + 1;
            }
            if (edge[p.y] == null) {
                edge[p.y] = [];
            }
            edge[p.y][p.x] = SOLID;
        });

        let rowsToDelete = 0;
        for (let i = 0; i < highY; i++) {
            let deleteRow = true;
            for (let j = 0; j < 7; j++) {
                if (edge[i][j] !== SOLID) {
                    deleteRow = false;
                    break;
                }
            }
            if (deleteRow) {
                rowsToDelete++;
            } else {
                break;
            }
        }

        for (let i = 0; i < rowsToDelete; i++) {
            edge.shift();
            highY--;
            rowsDeleted++;
        }

        return edge;
    }

    const maxRocks = 2022;
    let rockType = 0;

    let edge = [];
    edge[0] = [];

    for (let i = 0; i < maxRocks; i++) {
        let rock = new Rock(0, highY, rockType);

        let moving = true;
        while (moving) {
            let dir = data.shift();
            data.push(dir);

            rock = moveRock(rock, edge, dir, 0);

            let ogX = rock.points[0].x;
            let ogY = rock.points[0].y;
            rock = moveRock(rock, edge, 0, -1);

            if (rock.points[0].x === ogX && rock.points[0].y === ogY) {
                moving = false;
                edge = getEdge(rock.points);
            }
        }

        rockType = (rockType + 1) % 5;
    }

    let answer = highY + rowsDeleted;
    return { value: answer };
}
