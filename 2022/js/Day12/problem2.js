export default function solve({ lines, rawData }) {
    const { min } = Math;
    const minCharCode = 'a'.charCodeAt(0);
    const maxCharCode = 'z'.charCodeAt(0);
    const [startCharCode, goalCharCode] = [
        'S'.charCodeAt(0) - minCharCode,
        'E'.charCodeAt(0) - minCharCode,
    ];

    let start = [];
    let goal;
    let minStepsToGoal = Infinity;

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
            if (height === startCharCode || height === 0) {
                start.push([x, y]);
                height = 0;
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

    // too lazy to deep copy the array to pass into each call
    function resetData() {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                data[i][j].minStepsToReach = Infinity;
            }
        }
    }

    for (let i = 0; i < start.length; i++) {
        findGoal(start[i][0], start[i][1], 0);
        minStepsToGoal = min(data[goal[0]][goal[1]].minStepsToReach, minStepsToGoal);
        resetData();
    }

    const answer = minStepsToGoal;
    return { value: answer };
}
