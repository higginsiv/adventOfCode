import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    let computer = rawData.split('').map(Number);
    const maxId = Math.floor(computer.length / 2);
    const lastIsFile = computer.length % 2 === 1;

    // If the input is odd then the last element is a file
    let right = lastIsFile ? computer.length - 1 : computer.length - 2;
    // The first element is always multiplied by 0 so is not needed
    let left = 1;

    let checksum = 0;

    // The index in the expanded file system
    let index = computer[0];

    // The furthest right id
    let id = maxId;

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
