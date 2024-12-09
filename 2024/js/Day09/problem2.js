import { Solution } from '#tools/solution.js';

export default function solve({ lines, rawData }) {
    let computer = rawData.split('').map((el) => {
        el = {
            size: Number(el),
            free: Number(el),
        };
        return el;
    });
    const maxId = Math.floor(computer.length / 2);
    const maxIndex = computer.reduce((acc, el) => acc + el.size, 0) - 1;

    const lastIsFile = computer.length % 2 === 1;

    // If the input is odd then the last element is a file
    let right = lastIsFile ? computer.length - 1 : computer.length - 2;
    // The first element is always multiplied by 0 so is not needed
    let left = 1;

    let checksum = 0;

    // The index in the expanded file system
    let index = computer[0].size;

    // The furthest right id
    let id = maxId;

    while (right >= 0) {
        while (left < right) {
            if (computer[left].free >= computer[right].size) {
                index += (computer[left].size - computer[left].free);
                while (computer[right].size > 0) {
                    computer[right].size--;
                    computer[left].free--;
                    checksum += index * id;
                    index++;
                }

                if (computer[left].free === 0) {
                    index += computer[left + 1].size;
                    left += 2;
                }
                break;
            }
            index += computer[left].size + computer[left + 1].size;
            left += 2;
        }
        if (left > right) {
            index -= computer[left - 1].size;
        }

        while (computer[right].size > 0) {
            computer[right].size--;
            checksum += index * id;
            index++;
        }

        id--;
        right -= 2;
        index = computer[0].size;
        left = 1;
    }

    return new Solution(checksum);
}
