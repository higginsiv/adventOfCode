export default function solve({ lines, rawData }) {
    const { floor } = Math;
    const DATA = lines.map((x) => x.split(''));
    const [ROUND, CUBE] = ['O', '#'];
    const DIRECTIONS = ['N', 'W', 'S', 'E'];
    const CYCLES = 1000000000;

    let grid = DATA;

    let cycles = new Map();

    let ignoreCycle = false;
    let i = 0;
    while (i < CYCLES) {
        if (!ignoreCycle) {
            let key = generateKey(grid);
            if (cycles.has(key)) {
                let originalIndex = cycles.get(key);
                let cycleLength = i - originalIndex;

                let fullCycles = floor((CYCLES - originalIndex) / cycleLength);
                i = originalIndex + fullCycles * cycleLength;

                if (i < CYCLES) {
                    i -= cycleLength;
                }

                ignoreCycle = true;
                continue;
            } else {
                cycles.set(key, i);
            }
        }

        DIRECTIONS.forEach((direction) => {
            switch (direction) {
                case 'N':
                    grid = tiltNorth(grid);
                    break;
                case 'W':
                    grid = tiltWest(grid);
                    break;
                case 'S':
                    grid = tiltSouth(grid);
                    break;
                case 'E':
                    grid = tiltEast(grid);
                    break;
            }
        });

        i++;
    }

    let totalLoad = 0;
    for (let j = 0; j < grid[0].length; j++) {
        for (let i = 0; i < grid.length; i++) {
            const rock = grid[i][j];
            if (rock === ROUND) {
                totalLoad += grid.length - i;
            }
        }
    }

    function tiltEast(grid) {
        return grid.map((row) => {
            let segments = row.join('').split('#');
            return segments
                .map((segment) => {
                    let countO = (segment.match(/O/g) || []).length;
                    let countDot = segment.length - countO;
                    return '.'.repeat(countDot) + 'O'.repeat(countO);
                })
                .join('#')
                .split('');
        });
    }

    function tiltNorth(grid) {
        let transposedGrid = transpose(grid);
        let result = transposedGrid.map((col) => {
            let segments = col.join('').split('#');
            return segments
                .map((segment) => {
                    let countO = (segment.match(/O/g) || []).length;
                    let countDot = segment.length - countO;
                    return 'O'.repeat(countO) + '.'.repeat(countDot);
                })
                .join('#')
                .split('');
        });
        return transpose(result);
    }

    function tiltSouth(grid) {
        let transposedGrid = transpose(grid);
        let result = transposedGrid.map((col) => {
            let segments = col.join('').split('#');
            return segments
                .map((segment) => {
                    let countO = (segment.match(/O/g) || []).length;
                    let countDot = segment.length - countO;
                    return '.'.repeat(countDot) + 'O'.repeat(countO);
                })
                .join('#')
                .split('');
        });
        return transpose(result);
    }

    function tiltWest(grid) {
        return grid.map((row) => {
            let segments = row.join('').split('#');
            return segments
                .map((segment) => {
                    let countO = (segment.match(/O/g) || []).length;
                    let countDot = segment.length - countO;
                    return 'O'.repeat(countO) + '.'.repeat(countDot);
                })
                .join('#')
                .split('');
        });
    }

    function transpose(grid) {
        return grid[0].map((_, i) => grid.map((row) => row[i]));
    }

    function generateKey(grid) {
        return grid
            .map((row) => {
                row = row.map((x) => (x === null ? '.' : x));
                return row.join('');
            })
            .join('');
    }

    function printGrid(grid) {
        grid.forEach((row) => console.log(row.join('')));
        console.log();
    }

    const answer = totalLoad;
    return { value: answer };
}
