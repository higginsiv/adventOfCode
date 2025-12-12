// WORK IN PROGRESS
// Attempting a real solution to part1 that isn't full cheese
import { Solution } from '#tools/solution.js';
import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    let data = rawData.split(EOL + EOL);

    let goals = data.pop();
    goals = goals.split(EOL).map((line) => {
        const [dimension, values] = line.split(': ');
        const [row, col] = dimension.split('x').map(Number);
        return { row, col, values: values.split(' ').map(Number) };
    });

    const presents = data.map((x) => {
        x = x.split(EOL);
        x.shift();
        let grid = x.map((line) => line.split('').map((char) => (char === '#' ? 1 : 0)));

        // Rotate and flip to get all orientations
        let orientations = new Set();
        let current = grid;
        for (let i = 0; i < 4; i++) {
            orientations.add(current);
            orientations.add(flip(current));
            current = rotate(current);
        }

        return [...orientations];
    });

    // console.log('Presents orientations:');
    // presents.forEach((present, index) => {
    //     console.log(`Present ${index + 1}:`);
    //     present.forEach((orientation, oIndex) => {
    //         console.log(`Orientation ${oIndex + 1}:`);
    //         orientation.forEach((row) => {
    //             console.log(row.map((cell) => (cell === 1 ? '#' : '.')).join(''));
    //         });
    //         console.log('');
    //     });
    // });
    
    const answer = goals.reduce((total, goal) => {
        let grid = Array.from({ length: goal.row }, () => Array(goal.col).fill(0));
        const canFit = canFitAll(grid, goal.values);
        console.log(`Goal ${goal.row}x${goal.col} with values ${goal.values} can fit: ${canFit}`);
        return total + (canFit ? 1 : 0);
    }, 0);

    return new Solution(answer);

    function canFitAll(grid, goals) {
        const nextPresentIndex = goals.findIndex((value) => value > 0);
        if (nextPresentIndex === -1) {
            return true;
        }

        const present = presents[nextPresentIndex];
        for (let orientation of present) {
            for (let row = 0; row <= grid.length; row++) {
                for (let col = 0; col <= grid[0].length; col++) {
                    if (canPlace(grid, orientation, row, col)) {
                        // Place the present
                        for (let r = 0; r < orientation.length; r++) {
                            for (let c = 0; c < orientation[0].length; c++) {
                                if (orientation[r][c] === 1) {
                                    grid[row + r][col + c] = 1;
                                }
                            }
                        }

                        // Decrease the count of this present
                        goals[nextPresentIndex]--;
                        if (canFitAll(grid, goals)) {
                            return true;
                        }

                        // Backtrack: remove the present
                        for (let r = 0; r < orientation.length; r++) {
                            for (let c = 0; c < orientation[0].length; c++) {
                                if (orientation[r][c] === 1) {
                                    grid[row + r][col + c] = 0;
                                }
                            }
                        }
                        // Restore the count of this present
                        goals[nextPresentIndex]++;
                    }
                }
            }
        }
        return false;
    }

    function canPlace(grid, present, startRow, startCol) {
        const presentRows = present.length;
        const presentCols = present[0].length;

        for (let row = 0; row < presentRows; row++) {
            for (let col = 0; col < presentCols; col++) {
                if (present[row][col] === 1) {
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;

                    if (
                        gridRow >= grid.length ||
                        gridCol >= grid[0].length ||
                        grid[gridRow][gridCol] === 1
                    ) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    function rotate(matrix) {
        const length = matrix.length;
        const result = Array.from({ length: length }, () => Array(length).fill(0));

        for (let row = 0; row < length; row++) {
            for (let col = 0; col < length; col++) {
                result[col][length - 1 - row] = matrix[row][col];
            }
        }

        return result;
    }

    function flip(matrix) {
        const length = matrix.length;
        const result = Array.from({ length: length }, () => Array(length).fill(0));

        for (let row = 0; row < length; row++) {
            for (let col = 0; col < length; col++) {
                result[row][length - 1 - col] = matrix[row][col];
            }
        }

        return result;
    }
}
