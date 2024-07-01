export default function solve({ lines, rawData }) {
    const drawn = lines[0].split(',');

    // remove all but bingo boards from lines
    lines.splice(0, 2);

    let boards = lines.reduce(
        (previous, current) => {
            let index = previous.length - 1;
            if (current === '') {
                previous.push([]);
                return previous;
            } else {
                // ignore stupid leading whitespace
                let currentTrim = current.trim();
                // split on one or more whitespaces
                previous[index] = previous[index].concat(currentTrim.split(/\s+/));
                return previous;
            }
        },
        [[]],
    );

    let answer;

    outer: for (let num of drawn) {
        for (let board of boards) {
            for (let [index, el] of board.entries()) {
                if (el === num) {
                    board[index] = 'X';
                }

                if (
                    board[0] + board[1] + board[2] + board[3] + board[4] === 'XXXXX' ||
                    board[5] + board[6] + board[7] + board[8] + board[9] === 'XXXXX' ||
                    board[10] + board[11] + board[12] + board[13] + board[14] === 'XXXXX' ||
                    board[15] + board[16] + board[17] + board[18] + board[19] === 'XXXXX' ||
                    board[20] + board[21] + board[22] + board[23] + board[24] === 'XXXXX' ||
                    board[0] + board[5] + board[10] + board[15] + board[20] === 'XXXXX' ||
                    board[1] + board[6] + board[11] + board[16] + board[21] === 'XXXXX' ||
                    board[2] + board[7] + board[12] + board[17] + board[22] === 'XXXXX' ||
                    board[3] + board[8] + board[13] + board[18] + board[23] === 'XXXXX' ||
                    board[4] + board[9] + board[14] + board[19] + board[24] === 'XXXXX' ||
                    board[0] + board[6] + board[12] + board[18] + board[24] === 'XXXXX' ||
                    board[4] + board[8] + board[12] + board[16] + board[20] === 'XXXXX'
                ) {
                    let sum = board.reduce((previous, current) => {
                        if (current !== 'X') {
                            return previous + parseInt(current);
                        } else {
                            return previous;
                        }
                    }, 0);

                    answer = sum * num;
                    break outer;
                }
            }
        }
    }

    return { value: answer };
}
