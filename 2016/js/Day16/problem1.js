export default function solve({ lines, rawData }) {
    const DISK_SIZE = 272;

    let a = rawData;

    while (a.length < DISK_SIZE) {
        let b = a
            .split('')
            .reverse()
            .map((c) => (c === '1' ? '0' : '1'))
            .join('');
        a = a + '0' + b;
    }

    a = a.substr(0, DISK_SIZE);

    let checksum = a;
    while (checksum.length % 2 === 0) {
        let newChecksum = '';
        for (let i = 0; i < checksum.length; i += 2) {
            newChecksum += checksum[i] === checksum[i + 1] ? '1' : '0';
        }
        checksum = newChecksum;
    }

    let answer = checksum;
    return { value: answer };
}
