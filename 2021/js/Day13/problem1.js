import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    let [coordinates, folds] = rawData.split(EOL + EOL);
    coordinates = coordinates.split(EOL).map((x) => x.split(',').map((y) => parseInt(y)));
    folds = folds.split(EOL).map((x) => {
        x = x.replace('fold along ', '');
        return x.split('=');
    });

    let grid = [];
    let gridMaxX = 0;
    let gridMaxY = 0;

    // idk why the prompt does weird x and y coords, but this reverses it
    coordinates.forEach((coordinate) => {
        const [x, y] = coordinate;
        if (!grid[y]) {
            grid[y] = [];
        }

        gridMaxX = gridMaxX > y ? gridMaxX : y;
        gridMaxY = gridMaxY > x ? gridMaxY : x;

        grid[y][x] = true;
    });

    // part 1 only wants one fold
    let fold = folds[0];
    let [foldDir, foldIndex] = fold;
    foldIndex = parseInt(foldIndex);

    let foldedGrid = [];
    if (foldDir === 'x') {
        grid.forEach((line, index) => {
            for (let i = 0; i < foldIndex; i++) {
                if (!foldedGrid[index]) {
                    foldedGrid[index] = [];
                }
                foldedGrid[index][i] = line[i] || line[foldIndex + (foldIndex - i)];
            }
        });
    } else {
        for (let i = 0; i < grid.length; i++) {
            if (i >= foldIndex) {
                break;
            }
            for (let j = 0; j < gridMaxX; j++) {
                if (!foldedGrid[i]) {
                    foldedGrid[i] = [];
                }

                foldedGrid[i][j] =
                    (grid[i] && grid[i][j]) ||
                    (grid[foldIndex + (foldIndex - i)] && grid[foldIndex + (foldIndex - i)][j]);
            }
        }
    }

    let totalPoints = 0;
    foldedGrid.forEach((line) => {
        line.forEach((point) => {
            if (point === true) {
                totalPoints++;
            }
        });
    });
    const answer = totalPoints;
    return { value: answer };
}
