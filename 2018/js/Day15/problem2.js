import { run } from './problem1.js';
export default function solve({ lines, rawData }) {
    const { floor } = Math;
    let attackFloor = 4;
    let attackCeiling = 50;
    let currentAttack = 25;

    let answer;
    while (true) {
        let result = true;
        try {
            answer = run(lines, currentAttack, true);
        } catch (e) {
            result = false;
        }
        if (result) {
            attackCeiling = currentAttack;
            currentAttack = floor((currentAttack + attackFloor) / 2);
        } else {
            attackFloor = currentAttack;
            currentAttack = floor((currentAttack + attackCeiling) / 2);
        }
        if (attackCeiling - attackFloor <= 1) {
            break;
        }
    }

    return { value: answer };
}
