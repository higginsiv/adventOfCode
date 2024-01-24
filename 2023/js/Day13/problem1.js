const fr = require('../../../tools/fileReader');
const [YEAR, DAY, PART] = ['2023', '13', '1'];
const EOL = require('os').EOL;
let answer = fr
    .getInput(YEAR, DAY, EOL + EOL)
    .map((x) => {
        let grid = { rows: [], columns: [] };

        x = x.split(EOL).map((x) => x.split(''));

        for (let i = 0; i < x.length; i++) {
            let row = 0;
            for (let j = 0; j < x[i].length; j++) {
                row |= x[i][j] === '#' ? 1 << (x[i].length - j - 1) : 0;
            }
            grid.rows.push(row);
        }

        for (let j = 0; j < x[0].length; j++) {
            let column = 0;
            for (let i = 0; i < x.length; i++) {
                column |= x[i][j] === '#' ? 1 << (x.length - i - 1) : 0;
            }
            grid.columns.push(column);
        }
        return grid;
    })
    .reduce((total, curr) => {
        let rowMirrorIndex = findMirror(curr.rows);
        let columnMirrorIndex = findMirror(curr.columns);

        if (rowMirrorIndex !== -1) {
            return total + 100 * rowMirrorIndex;
        }

        if (columnMirrorIndex !== -1) {
            return total + columnMirrorIndex;
        }

        console.log('hmmmm');
        return total;
    }, 0);

function findMirror(row) {
    for (let i = 0; i < row.length - 1; i++) {
        if (i == 0) {
            for (let j = row.length - 1; j > i; j--) {
                if (row[i] !== row[j]) {
                    continue;
                }
                let subRow = row.slice(i, j + 1);
                if (isMirror(subRow)) {
                    return i + Math.floor(subRow.length / 2);
                }
            }
        } else {
            if (row[i] !== row[row.length - 1]) {
                continue;
            }
            let subRow = row.slice(i);
            if (isMirror(subRow)) {
                return i + Math.floor(subRow.length / 2);
            }
        }
    }
    return -1;
}

function isMirror(arr) {
    let len = arr.length;
    for (let i = 0; i < Math.floor(len / 2); i++) {
        if (arr[i] !== arr[len - i - 1]) {
            return false;
        }
    }
    return true;
}

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
