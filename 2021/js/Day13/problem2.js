module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const EOL = require('os').EOL;
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
    
    for (let foldI = 0; foldI < folds.length; foldI++) {
        let fold = folds[foldI];
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
        grid = [];
        foldedGrid.forEach((line, index) => {
            line.forEach((point, indexy) => {
                if (!grid[index]) {
                    grid[index] = [];
                }
                grid[index][indexy] = point;
            });
        });
    }
    
    // map the grid into easier to read symbols
    grid = grid.map((line) => {
        return line.map((point) => {
            return point ? '*' : '';
        });
    });

    let tempGrid = [];
    grid.forEach((line) => {
        let tempLine = [];
        // Doing a refactor to make this solution use the solver function. Don't know why the grid gets so big but cutting it off here for now.
        for (let i = 0; i < 30; i++) {
            if (line[i]) {
                tempLine.push('*');
            } else {
                tempLine.push(' ');
            }
        }
        tempGrid.push(tempLine);
    });
    
    return { value: [tempGrid, ['*']], strategy: 'grid' };
}