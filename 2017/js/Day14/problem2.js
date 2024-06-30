import { knotHash } from '../Day10/problem2.js';

export default function solve({ lines, rawData }) {
    let answer = 0;
    let grid = Array(128)
        .fill(0)
        .map(() => Array(128).fill(0));

    for (let i = 0; i < 128; i++) {
        grid[i] = knotHash(`${rawData}-${i}`.split('').map((x) => x.charCodeAt(0)))
            .split('')
            .map((x) => parseInt(x, 16).toString(2).padStart(4, '0'))
            .join('')
            .split('');
    }

    let visited = Array(128)
        .fill(0)
        .map(() => Array(128).fill(0));

    let startX = 0;
    let startY = 0;
    while (true) {
        let found = false;
        for (let i = 0; i < 128; i++) {
            for (let j = 0; j < 128; j++) {
                if (visited[i][j] === 0 && grid[i][j] === '1') {
                    startX = i;
                    startY = j;
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        if (!found) {
            break;
        }
        answer++;
        let queue = [{ x: startX, y: startY }];

        while (queue.length > 0) {
            let current = queue.shift();
            let x = current.x;
            let y = current.y;
            if (visited[x][y] === 1) {
                continue;
            }
            visited[x][y] = 1;
            if (grid[x][y] === '0') {
                continue;
            }
            if (x > 0) {
                queue.push({ x: x - 1, y: y });
            }
            if (x < 127) {
                queue.push({ x: x + 1, y: y });
            }
            if (y > 0) {
                queue.push({ x: x, y: y - 1 });
            }
            if (y < 127) {
                queue.push({ x: x, y: y + 1 });
            }
        }
    }

    return { value: answer };
}
