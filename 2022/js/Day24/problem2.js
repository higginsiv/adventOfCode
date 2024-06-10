module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const data = lines.map((x) => {
        x = x.split('');
        return x;
    });

    const VALLEY_ROWS = data.length - 2;
    const VALLEY_COLS = data[0].length - 2;
    const VALLEY_START = 1;
    const VALLEY_WALL = '#';
    const [START_ROW, START_COL] = [0, 1];
    const [END_ROW, END_COL] = [data.length - 1, data[0].length - 2];
    const [L_BLIZ, R_BLIZ, U_BLIZ, D_BLIZ] = ['<', '>', '^', 'v'];

    let points = Array.from(Array(data.length), (x) => Array(data[0].length));

    class Point {
        blizzVertTurns = new Set();
        blizzHorTurns = new Set();
        minStepsToReach = new Map();
        globalMin = Infinity;
        isGoal = false;

        constructor(blizzVertTurns, blizzHorTurns) {
            this.blizzVertTurns = blizzVertTurns;
            this.blizzHorTurns = blizzHorTurns;
        }
    }

    class Iteration {
        row;
        col;
        turns;
        goalRow;
        goalCol;
        constructor(row, col, turns, goalRow, goalCol) {
            this.row = row;
            this.col = col;
            this.turns = turns;
            this.goalRow = goalRow;
            this.goalCol = goalCol;
        }
    }
    let goalPoint = new Point(new Set(), new Set());
    goalPoint.isGoal = true;
    points[END_ROW][END_COL] = goalPoint;
    let startPoint = new Point(new Set(), new Set());
    startPoint.globalMin = 0;
    startPoint.minStepsToReach.set('0.0', Infinity);
    points[START_ROW][START_COL] = startPoint;

    for (let row = VALLEY_START; row <= VALLEY_ROWS; row++) {
        for (let col = VALLEY_START; col <= VALLEY_COLS; col++) {
            let blizzVertTurns = new Set();
            let blizzHorTurns = new Set();
            for (let pRow = VALLEY_START; pRow <= VALLEY_ROWS; pRow++) {
                let el = data[pRow][col];
                if (el === U_BLIZ) {
                    let turns = pRow - row;
                    if (turns < 0) {
                        turns = VALLEY_ROWS + turns;
                    }
                    blizzVertTurns.add(turns);
                } else if (el === D_BLIZ) {
                    let turns = row - pRow;
                    if (turns < 0) {
                        turns = VALLEY_ROWS + turns;
                    }
                    blizzVertTurns.add(turns);
                }
            }
            for (let pCol = VALLEY_START; pCol <= VALLEY_COLS; pCol++) {
                let el = data[row][pCol];
                if (el === L_BLIZ) {
                    let turns = pCol - col;
                    if (turns < 0) {
                        turns = VALLEY_COLS + turns;
                    }
                    blizzHorTurns.add(turns);
                } else if (el === R_BLIZ) {
                    let turns = col - pCol;
                    if (turns < 0) {
                        turns = VALLEY_COLS + turns;
                    }
                    blizzHorTurns.add(turns);
                }
            }
            points[row][col] = new Point(blizzVertTurns, blizzHorTurns);
        }
    }

    let queue = [];

    function loop(startRow, startCol, turns, goalRow, goalCol) {
        queue.push(new Iteration(startRow, startCol, turns, goalRow, goalCol));
        while (queue.length > 0) {
            let iter = queue.shift();
            findGoal(iter.row, iter.col, iter.turns, iter.goalRow, iter.goalCol);
        }
    }

    function findGoal(row, col, turns, goalRow, goalCol) {
        let point = points[row][col];
        let state = (turns % VALLEY_ROWS) + '.' + (turns % VALLEY_COLS);
        point.minStepsToReach.get(state);
        if (point.minStepsToReach.get(state) == null || point.minStepsToReach.get(state) > turns) {
            point.minStepsToReach.set(state, turns);
            if (point.globalMin > turns) {
                point.globalMin = turns;
            }
            turns++;
            if (!point.isGoal && turns < points[goalRow][goalCol].globalMin) {
                // Moves are cardinal + wait
                isValidMove(row + 1, col, turns) &&
                    queue.push(new Iteration(row + 1, col, turns, goalRow, goalCol));
                isValidMove(row - 1, col, turns) &&
                    queue.push(new Iteration(row - 1, col, turns, goalRow, goalCol));
                isValidMove(row, col + 1, turns) &&
                    queue.push(new Iteration(row, col + 1, turns, goalRow, goalCol));
                isValidMove(row, col - 1, turns) &&
                    queue.push(new Iteration(row, col - 1, turns, goalRow, goalCol));
                isValidMove(row, col, turns) &&
                    queue.push(new Iteration(row, col, turns, goalRow, goalCol));
            }
        }
    }

    function isValidMove(newRow, newCol, turns) {
        let rowInBounds =
            newRow >= 0 && newRow < points.length && data[newRow][newCol] !== VALLEY_WALL;
        let noHorBlizz =
            rowInBounds && !points[newRow][newCol].blizzHorTurns.has(turns % VALLEY_COLS);
        let noVertBlizz =
            rowInBounds && !points[newRow][newCol].blizzVertTurns.has(turns % VALLEY_ROWS);
        return rowInBounds && noHorBlizz && noVertBlizz;
    }

    function resetPoints(goalRow, goalCol) {
        for (let row = 0; row < points.length; row++) {
            for (let col = 0; col < points[row].length; col++) {
                if (points[row][col] != null) {
                    points[row][col].minStepsToReach = new Map();
                    points[row][col].globalMin = Infinity;
                    points[row][col].isGoal = goalRow === row && goalCol === col;
                }
            }
        }
    }

    loop(START_ROW, START_COL, 0, END_ROW, END_COL);
    let wayThere = points[END_ROW][END_COL].globalMin;
    resetPoints(START_ROW, START_COL);

    loop(END_ROW, END_COL, wayThere, START_ROW, START_COL);
    let wayBack = points[START_ROW][START_COL].globalMin;
    resetPoints(END_ROW, END_COL);

    loop(START_ROW, START_COL, wayBack, END_ROW, END_COL);
    const answer = points[END_ROW][END_COL].globalMin;
    return { value: answer };
}
