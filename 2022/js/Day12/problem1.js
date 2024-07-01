export default function solve({ lines, rawData }) {
    const minCharCode = 'a'.charCodeAt(0);
    const maxCharCode = 'z'.charCodeAt(0);
    const [startCharCode, goalCharCode] = [
        'S'.charCodeAt(0) - minCharCode,
        'E'.charCodeAt(0) - minCharCode,
    ];

    let start;
    let goal;

    class Point {
        height;
        minStepsToReach = Infinity;
        isGoal;

        constructor(height, isGoal) {
            this.height = height;
            this.isGoal = isGoal;
        }
    }

    const data = lines.map((line, x) =>
        line.split('').map((char, y) => {
            let height = char.charCodeAt(0) - minCharCode;
            let isGoal = false;
            if (height === startCharCode) {
                start = [x, y];
                height = minCharCode - minCharCode;
            } else if (height === goalCharCode) {
                goal = [x, y];
                height = maxCharCode - minCharCode;
                isGoal = true;
            }
            return new Point(height, isGoal);
        }),
    );

    function findGoal(x, y, steps) {
        let point = data[x][y];
        if (point.minStepsToReach > steps) {
            point.minStepsToReach = steps;
            steps++;
            if (!point.isGoal && steps < data[goal[0]][goal[1]].minStepsToReach) {
                isValidClimb(point.height, x + 1, y) && findGoal(x + 1, y, steps);
                isValidClimb(point.height, x - 1, y) && findGoal(x - 1, y, steps);
                isValidClimb(point.height, x, y + 1) && findGoal(x, y + 1, steps);
                isValidClimb(point.height, x, y - 1) && findGoal(x, y - 1, steps);
            }
        }
    }

    function isValidClimb(currentHeight, newX, newY) {
        if (newX < 0 || newX >= data.length || newY < 0 || newY >= data[0].length) {
            return false;
        }
        return data[newX][newY].height <= currentHeight + 1;
    }

    findGoal(start[0], start[1], 0);

    const answer = data[goal[0]][goal[1]].minStepsToReach;
    return { value: answer };
}
