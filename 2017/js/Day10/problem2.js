module.exports = { solve: solve };

function solve({ lines, rawData }) {
    let lengths = rawData.split('').map((x) => x.charCodeAt(0));
    lengths.push(17, 31, 73, 47, 23);
    
    let rounds = 64;
    let numbers = new Array(256).fill(0).map((_, i) => i);
    let currentPosition = 0;
    let skipSize = 0;
    let sparseHash;

    for (let i = 0; i < rounds; i++) {
        sparseHash = lengths.slice();
        for (let length of sparseHash) {
            let temp = numbers.slice();
            for (let i = 0; i < length; i++) {
                let index = (currentPosition + i) % numbers.length;
                let reverseIndex = (currentPosition + length - i - 1) % numbers.length;
                numbers[index] = temp[reverseIndex];
            }
            currentPosition = (currentPosition + length + skipSize) % numbers.length;
            skipSize++;
        }
    }
 
    let denseHash = Array(16).fill(0);
    for (let i = 0; i < 16; i++) {
        denseHash[i] = numbers.slice(i * 16, i * 16 + 16).reduce((acc, x) => acc ^ x);
    }

    const answer = denseHash.map((x) => x.toString(16).padStart(2, '0')).join('');
    return { value: answer };
}
