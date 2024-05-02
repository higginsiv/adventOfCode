module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const {abs} = Math;
    const [NORTH, EAST, SOUTH, WEST] = ['N', 'E', 'S', 'W'];
    const [LEFT, RIGHT] = ['L', 'R'];
    const FORWARD = 'F';
    const SINGLE_TURN = 90;
    const [START_ROW, START_COL] = [0, 0];
    
    class Entity {
        row;
        col;
        constructor(row, col) {
            this.row = row;
            this.col = col;
        }
    }
    
    let ship = new Entity(START_ROW, START_COL);
    let waypoint = new Entity(START_ROW - 1, START_COL + 10);
    
    const data = lines
        .map((x) => {
            return [x.substring(0, 1), parseInt(x.substring(1))];
        })
        .forEach(([dir, dist]) => {
            move(dir, dist, waypoint);
        });
    
    function move(dir, dist, ent) {
        let steps;
        switch (dir) {
            case NORTH:
                ent.row -= dist;
                break;
            case EAST:
                ent.col += dist;
                break;
            case WEST:
                ent.col -= dist;
                break;
            case SOUTH:
                ent.row += dist;
                break;
            case FORWARD:
                ship.row = ship.row + dist * waypoint.row;
                ship.col = ship.col + dist * waypoint.col;
                break;
            case LEFT:
                steps = dist / SINGLE_TURN;
                for (let i = 0; i < steps; i++) {
                    let nextRow = -waypoint.col;
                    let nextCol = waypoint.row;
                    waypoint.row = nextRow;
                    waypoint.col = nextCol;
                }
                break;
            case RIGHT:
                steps = dist / SINGLE_TURN;
                for (let i = 0; i < steps; i++) {
                    let nextRow = waypoint.col;
                    let nextCol = -waypoint.row;
                    waypoint.row = nextRow;
                    waypoint.col = nextCol;
                }
                break;
        }
    }
    
    const answer = abs(ship.row - START_ROW) + abs(ship.col - START_COL);

    return { value: answer };
}