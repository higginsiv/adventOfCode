import { EOL } from 'os';
export default function solve({ lines, rawData }) {
    const answer = rawData
        .split(EOL + EOL)
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
        .reduce((total, curr, index) => {
            let ogRowMirrorIndex = findMirror(curr.rows);
            let ogColumnMirrorIndex = findMirror(curr.columns);

            let rowMirrorIndex;
            let colMirrorIndex;

            for (let i = 0; i < curr.rows.length; i++) {
                for (let j = 0; j < curr.columns.length; j++) {
                    let localRows = curr.rows.slice();
                    localRows[i] ^= 1 << j;

                    rowMirrorIndex = findMirror(localRows, ogRowMirrorIndex);

                    if (rowMirrorIndex !== -1) {
                        return total + 100 * rowMirrorIndex;
                    }
                }
            }

            for (let i = 0; i < curr.columns.length; i++) {
                for (let j = 0; j < curr.rows.length; j++) {
                    let localCols = curr.columns.slice();
                    localCols[i] ^= 1 << j;
                    colMirrorIndex = findMirror(localCols, ogColumnMirrorIndex);

                    if (colMirrorIndex !== -1) {
                        return total + colMirrorIndex;
                    }
                }
            }

            return total;
        }, 0);

    function findMirror(row, index) {
        for (let i = 0; i < row.length - 1; i++) {
            if (i == 0) {
                for (let j = row.length - 1; j > i; j--) {
                    if (row[i] !== row[j]) {
                        continue;
                    }
                    let subRow = row.slice(i, j + 1);
                    if (subRow.length % 2 === 1) {
                        continue;
                    }
                    if (isMirror(subRow)) {
                        let mirrorCenter = i + Math.floor(subRow.length / 2);
                        if (mirrorCenter !== index) {
                            return mirrorCenter;
                        }
                    }
                }
            } else {
                if (row[i] !== row[row.length - 1]) {
                    continue;
                }
                let subRow = row.slice(i);
                if (subRow.length % 2 === 1) {
                    continue;
                }
                if (isMirror(subRow)) {
                    let mirrorCenter = i + Math.floor(subRow.length / 2);

                    if (mirrorCenter !== index) {
                        return mirrorCenter;
                    }
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

    return { value: answer };
}
