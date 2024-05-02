module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const { abs } = Math;
    const [NORTH, EAST, SOUTH, WEST] = ['N', 'E', 'S', 'W'];
    const [LEFT, RIGHT] = ['L', 'R'];
    const FORWARD = 'F';
    const ORIENTATIONS = [NORTH, EAST, SOUTH, WEST];
    const SINGLE_TURN = 90;
    const [START_ROW, START_COL] = [0, 0];

    let orientation = EAST;
    let row = START_ROW;
    let col = START_COL;

    const data = lines
        .map((x) => {
            return [x.substring(0, 1), parseInt(x.substring(1))];
        })
        .forEach(([dir, dist]) => {
            move(dir, dist);
        });

    function move(dir, dist) {
        let newOrientation;
        switch (dir) {
            case NORTH:
                row -= dist;
                break;
            case EAST:
                col += dist;
                break;
            case WEST:
                col -= dist;
                break;
            case SOUTH:
                row += dist;
                break;
            case FORWARD:
                move(orientation, dist);
                break;
            case LEFT:
                newOrientation = ORIENTATIONS.indexOf(orientation) - dist / SINGLE_TURN;
                newOrientation =
                    newOrientation < 0 ? ORIENTATIONS.length + newOrientation : newOrientation;
                orientation = ORIENTATIONS[newOrientation];
                break;
            case RIGHT:
                newOrientation = ORIENTATIONS.indexOf(orientation) + dist / SINGLE_TURN;
                newOrientation = newOrientation % ORIENTATIONS.length;
                orientation = ORIENTATIONS[newOrientation];
                break;
        }
    }

    const answer = abs(row - START_ROW) + abs(col - START_COL);

    return { value: answer };
}
