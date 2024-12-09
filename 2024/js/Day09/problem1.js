import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    let computer = rawData.split('').map(Number);
    const maxId = Math.floor(computer.length / 2);
    const lastIsFile = computer.length % 2 === 1;

    let right = lastIsFile ? computer.length - 1 : computer.length - 2;
    let left = 1;
    let checksum = 0;
    let index = computer[0];
    let id = maxId;

    console.log(computer[left], computer[right], left, right);
    while (left <= right) {
        while (computer[left] > 0 && computer[right] > 0) {
            computer[left]--;
            computer[right]--;
            checksum += index * id;
            index++;
        }

        while (computer[left] === 0) {
            let nextFileSize = computer[left + 1];
            while (nextFileSize > 0) {
                checksum += index * Math.floor((left + 1) / 2);
                nextFileSize--;
                index++;
            }
            left += 2;
        }

        while (computer[right] === 0) {
            right -= 2;
            id--;
        }
    }
    return new Solution(checksum);
}
